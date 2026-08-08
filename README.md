# 💻 HitroBro.github.io — Terminal Portfolio

[![PyScript](https://img.shields.io/badge/Engine-PyScript-FF6B35?style=for-the-badge&logo=python&logoColor=white)](https://pyscript.net)
[![WASM](https://img.shields.io/badge/Runtime-WebAssembly-654FF0?style=for-the-badge&logo=webassembly&logoColor=white)](https://webassembly.org)
[![Zero JS Logic](https://img.shields.io/badge/Logic-Python%20Only-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://pyscript.net)
[![Live Demo](https://img.shields.io/badge/Demo-Live-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://HitroBro.github.io)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

**A fully interactive, browser-based terminal portfolio powered by Python running in WebAssembly via PyScript.**

---

## 🚀 Live Demo

**[https://HitroBro.github.io](https://HitroBro.github.io)** — Try it now!

---

## 🎯 Overview

This is **not** a standard HTML/CSS/JS portfolio. It's a **Virtual Terminal** running directly in the browser using WebAssembly.

Instead of using JavaScript for logic, this project uses **PyScript** to run a Python backend (`terminal.py`) that handles:
- Command parsing & execution
- Virtual filesystem simulation (directories, files, navigation)
- DOM manipulation & rendering
- Command history & tab completion

This demonstrates the ability to bring **backend logic to the frontend** — Python in the browser, no transpilation, no JavaScript framework.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **🐍 Python-Powered Logic** | All interactive logic (commands, parsing, history, FS) is pure Python |
| **🐚 Virtual File System** | Simulates Linux environment with directories, files, `ls`, `cd`, `cat`, `pwd`, `whoami`, `clear` |
| **📟 Bash-like Experience** | Familiar terminal commands, prompt customization, command history (↑/↓) |
| **🎨 Cyberpunk Aesthetic** | Custom CSS variables, scanlines, glow effects, matrix rain background |
| **⚡ Zero JavaScript Logic** | `terminal.py` handles everything — JS only bootstraps PyScript |
| **📱 Responsive** | Works on desktop and mobile browsers |

---

## 🛠️ Technical Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | [PyScript](https://pyscript.net/) — Python in WebAssembly (CPython compiled to WASM) |
| **Language** | Python 3.11+ (standard library only) |
| **Styling** | CSS3 (Custom Properties, Flexbox/Grid, Animations) |
| **Font** | Fira Code / JetBrains Mono (Nerd Fonts compatible) |
| **Hosting** | GitHub Pages (static hosting) |

---

## 📁 Project Structure

```text
HitroBro.github.io/
├── index.html      # Entry point — loads PyScript, defines terminal DOM
├── terminal.py     # Python backend: command parser, VFS, DOM bridge
├── style.css       # Cyberpunk terminal theme (CSS variables)
├── README.md
└── LICENSE
```

---

## 🧠 How It Works

### PyScript Bootstrap (index.html)
```html
<link rel="stylesheet" href="https://pyscript.net/releases/latest/core.css">
<script type="module" src="https://pyscript.net/releases/latest/core.js"></script>

<py-config>
  [[fetch]]
  files = ["terminal.py"]
</py-config>

<py-script src="terminal.py"></py-script>
```

### Python Backend (terminal.py)
```python
# Virtual filesystem
class VirtualFS:
    def __init__(self):
        self.root = Directory("/")
        self.cwd = self.root
    
    def resolve(self, path): ...
    def ls(self, path="."): ...
    def cd(self, path): ...
    def cat(self, path): ...

# Command dispatcher
COMMANDS = {
    "ls": cmd_ls,
    "cd": cmd_cd,
    "cat": cmd_cat,
    "pwd": cmd_pwd,
    "whoami": cmd_whoami,
    "clear": cmd_clear,
    "help": cmd_help,
}

# PyScript DOM bridge
from pyscript import display, Element
from js import document, console

def write_output(text, class_name="output"):
    display(text, target="terminal-output", append=True)

# Event loop via PyScript's async support
async def main():
    while True:
        cmd = await get_input()
        execute(cmd)
```

---

## 🚀 Local Development

Because PyScript fetches external files (`terminal.py`), this site **cannot run by simply double-clicking `index.html`** (CORS security policies).

```bash
# 1. Clone the repository
git clone https://github.com/HitroBro/HitroBro.github.io.git

# 2. Enter directory
cd HitroBro.github.io

# 3. Start a Python local server
python -m http.server

# 4. Open browser
# Visit http://localhost:8000
```

---

## 🎮 Available Commands

| Command | Description |
|---------|-------------|
| `ls [path]` | List directory contents |
| `cd <path>` | Change directory |
| `cat <file>` | Display file contents |
| `pwd` | Print working directory |
| `whoami` | Display user info |
| `clear` | Clear terminal |
| `help` | Show available commands |
| `about` | About this portfolio |
| `projects` | List featured projects |
| `skills` | Show technical skills |
| `contact` | Contact information |

---

## 🎨 Customization

### Theme (CSS Variables in `style.css`)
```css
:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --fg-primary: #00ff88;
  --fg-secondary: #00cc6a;
  --accent: #ff0066;
  --scanline-opacity: 0.15;
  --glow-intensity: 0.6;
}
```

### Adding Commands (in `terminal.py`)
```python
def cmd_mycommand(args, fs, write_output):
    write_output("Custom command executed!", "success")

COMMANDS["mycommand"] = cmd_mycommand
```

---

## 📚 Learning Resources

- [PyScript Documentation](https://docs.pyscript.net/)
- [PyScript GitHub](https://github.com/pyscript/pyscript)
- [CPython WASM Build](https://github.com/pyscript/pyscript/tree/main/src/core)
- [WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface)

---

## 📄 License

MIT License — Feel free to use, modify, and distribute.

---

<p align="center">
  <strong>Python in the browser. No JavaScript required. 🐍⚡</strong>
</p>

<p align="center">
  <a href="https://HitroBro.github.io">
    <img src="https://komarev.com/ghpvc/?username=HitroBro&repo=HitroBro.github.io&color=FF6B35&style=for-the-badge" alt="Views" />
  </a>
</p>