Title: How epoll Enables 10k Connections in C
Date: 2025-08-10 00:00
Category: Networking
Tags: epoll, C, networking, systems-programming, Linux
Author: Hitarth Ghia
Summary: A deep dive into how epoll enables high-concurrency network servers, covering file descriptors, event loops, and non-blocking I/O patterns.

---

When building high-performance network servers, the choice of I/O multiplexing mechanism fundamentally determines your scalability ceiling. This post explores how `epoll` enables handling 10,000+ concurrent connections on a single thread — the famous "C10k problem" solution.

## The C10k Problem

In the early 2000s, servers struggled to handle 10,000 simultaneous connections. Traditional approaches — `select()` and `poll()` — scaled poorly:

```c
// select() limitations
fd_set readfds;
FD_ZERO(&readfds);
for (int i = 0; i < max_fd; i++) {
    if (is_active(i)) FD_SET(i, &readfds);
}
int n = select(max_fd + 1, &readfds, NULL, NULL, NULL);
// O(n) scan every call, fd_set size limit (typically 1024)
```

**Key limitations:**
- **O(n) complexity** — must scan all file descriptors every call
- **FD_SETSIZE limit** — typically 1024 file descriptors
- **Kernel/user-space copies** — entire fd_set copied each syscall
- **No edge-triggered mode** — level-triggered only

## Enter epoll

Linux introduced `epoll` in kernel 2.5.44 (2002) specifically to solve this:

```c
int epfd = epoll_create1(0);
// Add file descriptor
struct epoll_event ev = {
    .events = EPOLLIN | EPOLLET,  // Edge-triggered
    .data.fd = sockfd
};
epoll_ctl(epfd, EPOLL_CTL_ADD, sockfd, &ev);

// Wait for events
struct epoll_event events[MAX_EVENTS];
int n = epoll_wait(epfd, events, MAX_EVENTS, -1);
// Only active fds returned — O(1) per ready fd
```

### Key Innovations

| Feature | select/poll | epoll |
|---------|-------------|-------|
| **Complexity** | O(n) per call | O(1) per ready fd |
| **Max FDs** | 1024 (FD_SETSIZE) | Unlimited (RLIMIT_NOFILE) |
| **Trigger modes** | Level only | Level + Edge-triggered |
| **Kernel/user copies** | Full fd_set each call | Only ready events returned |
| **Data association** | None | `epoll_data` union (ptr/fd/u32/u64) |

## Edge-Triggered vs Level-Triggered

```c
// Level-triggered (default) — fires while data available
ev.events = EPOLLIN;

// Edge-triggered — fires only on state change
ev.events = EPOLLIN | EPOLLET;
```

**Edge-triggered requirements:**
- Must use **non-blocking sockets** (`O_NONBLOCK`)
- Must **read/write until `EAGAIN`/`EWOULDBLOCK`**
- Missed events = stalled connection

```c
// Correct edge-triggered read loop
while (1) {
    ssize_t n = read(fd, buf, sizeof(buf));
    if (n > 0) {
        process(buf, n);
    } else if (n == 0) {
        // EOF
        break;
    } else if (errno == EAGAIN || errno == EWOULDBLOCK) {
        // No more data right now
        break;
    } else {
        // Error
        break;
    }
}
```

## The epoll Data Union — O(1) Dispatch

One of epoll's most powerful features: associating arbitrary data with each FD:

```c
typedef union epoll_data {
    void    *ptr;
    int      fd;
    uint32_t u32;
    uint64_t u64;
} epoll_data_t;

struct epoll_event {
    uint32_t     events;    // Epoll events
    epoll_data_t data;      // User data
};
```

**Typical pattern — context pointer:**

```c
typedef struct {
    int fd;
    enum { CLIENT, BACKEND, LISTENER } type;
    void *context;  // Your per-connection state
} Connection;

void register_fd(int epfd, int fd, Connection *ctx) {
    struct epoll_event ev = {
        .events = EPOLLIN | EPOLLET,
        .data.ptr = ctx  // Associate context directly
    };
    epoll_ctl(epfd, EPOLL_CTL_ADD, fd, &ev);
}

// In event loop — O(1) dispatch
struct epoll_event events[MAX_EVENTS];
int n = epoll_wait(epfd, events, MAX_EVENTS, -1);
for (int i = 0; i < n; i++) {
    Connection *ctx = events[i].data.ptr;
    // Direct access — no hash table lookup!
    handle_event(ctx, events[i].events);
}
```

This **O(1) dispatch** eliminates the hash table lookup required by `select`/`poll` implementations.

## Async Connect with EPOLLOUT

One of epoll's superpowers: non-blocking connect with async handshake:

```c
int sockfd = socket(AF_INET, SOCK_STREAM | SOCK_NONBLOCK, 0);
int ret = connect(sockfd, (struct sockaddr*)&addr, sizeof(addr));
if (ret == -1 && errno == EINPROGRESS) {
    // Connection in progress — register for EPOLLOUT
    struct epoll_event ev = {
        .events = EPOLLOUT | EPOLLET,
        .data.ptr = ctx
    };
    epoll_ctl(epfd, EPOLL_CTL_ADD, sockfd, &ev);
    return;
}

// In event loop
if (events[i].events & EPOLLOUT) {
    int err = 0;
    socklen_t len = sizeof(err);
    getsockopt(fd, SOL_SOCKET, SO_ERROR, &err, &len);
    if (err == 0) {
        // Connected! Switch to EPOLLIN
        mod_epoll(epfd, fd, EPOLLIN | EPOLLET, ctx);
    } else {
        // Connection failed
        handle_connect_error(ctx, err);
    }
}
```

This enables **zero-latency backend connections** in proxies — the gateway never blocks on `connect()`.

## Timerfd for Timeouts

epoll isn't just for sockets. `timerfd` integrates timers into the event loop:

```c
int tfd = timerfd_create(CLOCK_MONOTONIC, TFD_NONBLOCK);
struct itimerspec its = {
    .it_interval = { .tv_sec = 30, .tv_nsec = 0 },  // 30s interval
    .it_value    = { .tv_sec = 30, .tv_nsec = 0 }
};
timerfd_settime(tfd, 0, &its, NULL);

// Register with epoll
struct epoll_event ev = {
    .events = EPOLLIN,
    .data.ptr = timeout_ctx
};
epoll_ctl(epfd, EPOLL_CTL_ADD, tfd, &ev);

// In event loop
if (events[i].data.ptr == timeout_ctx) {
    uint64_t expirations;
    read(tfd, &expirations, sizeof(expirations));
    check_idle_connections();  // Check all connections for timeout
}
```

**Why CLOCK_MONOTONIC?** Immune to NTP adjustments — timeouts stay accurate even if system clock jumps.

## Signalfd for Signal Handling

No more signal handlers interrupting your event loop:

```c
sigset_t mask;
sigemptyset(&mask);
sigaddset(&mask, SIGINT);
sigaddset(&mask, SIGTERM);
sigaddset(&mask, SIGUSR1);
sigprocmask(SIG_BLOCK, &mask, NULL);

int sfd = signalfd(-1, &mask, SFD_NONBLOCK);

struct epoll_event ev = {
    .events = EPOLLIN,
    .data.ptr = signal_ctx
};
epoll_ctl(epfd, EPOLL_CTL_ADD, sfd, &ev);

// In event loop
if (events[i].data.ptr == signal_ctx) {
    struct signalfd_siginfo si;
    read(sfd, &si, sizeof(si));
    switch (si.ssi_signo) {
        case SIGINT:
        case SIGTERM:
            shutdown_gracefully();
            break;
        case SIGUSR1:
            dump_metrics();
            break;
    }
}
```

**Benefits:** No async-signal-unsafe functions, signals become regular events.

## Putting It All Together: The Event Loop

```c
#define MAX_EVENTS 256

int epfd = epoll_create1(0);
// Register listener, timerfd, signalfd...

struct epoll_event events[MAX_EVENTS];

while (running) {
    int n = epoll_wait(epfd, events, MAX_EVENTS, -1);
    if (n == -1) {
        if (errno == EINTR) continue;
        perror("epoll_wait");
        break;
    }

    for (int i = 0; i < n; i++) {
        uint32_t events = events[i].events;
        void *ctx = events[i].data.ptr;

        if (ctx == listener_ctx) {
            accept_connections(epfd);
        } else if (ctx == timer_ctx) {
            handle_timeouts();
        } else if (ctx == signal_ctx) {
            handle_signals();
        } else {
            Connection *conn = ctx;
            if (events & (EPOLLERR | EPOLLHUP)) {
                handle_error(conn);
            } else if (events & EPOLLIN) {
                handle_read(conn);
            } else if (events & EPOLLOUT) {
                handle_write(conn);
            }
        }
    }
}
```

## Performance Characteristics

| Metric | Value | Notes |
|--------|-------|-------|
| **Max concurrent connections** | 10k+ | Limited by RLIMIT_NOFILE, memory |
| **CPU per connection** | ~1-2 μs/event | Minimal syscall overhead |
| **Memory per connection** | ~2-4 KB | Ring buffers + context |
| **Syscalls per event** | 1 (epoll_wait) | Batch processing |

## Common Pitfalls

| Pitfall | Solution |
|---------|----------|
| **Blocking in event loop** | All I/O must be non-blocking |
| **Forgetting EAGAIN handling** | Loop until EAGAIN in edge-triggered mode |
| **Missing EPOLLRDHUP** | Add to detect clean peer shutdown |
| **Starvation in edge-triggered** | Process all available data per event |
| **FD leaks** | Always close on error/close paths |

## Conclusion

epoll transforms the C10k problem from "impossible" to "routine." By combining:

1. **O(1) readiness notification**
2. **Edge-triggered efficiency**
3. **Rich data association (epoll_data)**
4. **Timer/signal integration (timerfd/signalfd)**

You can build servers handling 10k-100k+ connections on a single thread — the foundation of modern high-performance infrastructure like nginx, HAProxy, and our own `async-tcp-gateway`.

---

*Want to see this in action? Check out [async-tcp-gateway](https://github.com/HitroBro/async-tcp-gateway) — a production-ready C11 implementation with health checks, rate limiting, and metrics.*