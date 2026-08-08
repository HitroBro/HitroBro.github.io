#!/usr/bin/env python3
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

import os
import sys

# Site
AUTHOR = 'Hitarth Ghia'
SITENAME = 'HitroBro'
SITEURL = 'https://HitroBro.github.io'
SITESUBTITLE = 'Cyber Security Student (CoE) | Network Engineering & Security Automation'

# Content
PATH = 'content'
TIMEZONE = 'Asia/Kolkata'
DEFAULT_LANG = 'en'
DEFAULT_DATE_FORMAT = '%b %d, %Y'

# Theme
THEME = 'themes/hitrobro'

# URL structure
ARTICLE_URL = '{category}/{slug}/'
ARTICLE_SAVE_AS = '{category}/{slug}/index.html'
PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'
CATEGORY_URL = '{slug}/'
CATEGORY_SAVE_AS = '{slug}/index.html'
TAG_URL = 'tag/{slug}/'
TAG_SAVE_AS = 'tag/{slug}/index.html'
AUTHOR_URL = 'author/{slug}/'
AUTHOR_SAVE_AS = 'author/{slug}/index.html'

# Archives
ARCHIVES_URL = 'archives/'
ARCHIVES_SAVE_AS = 'archives/index.html'
YEAR_ARCHIVE_URL = 'archives/{date:%Y}/'
YEAR_ARCHIVE_SAVE_AS = 'archives/{date:%Y}/index.html'
MONTH_ARCHIVE_URL = 'archives/{date:%Y}/{date:%m}/'
MONTH_ARCHIVE_SAVE_AS = 'archives/{date:%Y}/{date:%m}/index.html'

# Feeds
FEED_ALL_ATOM = 'feeds/all.atom.xml'
CATEGORY_FEED_ATOM = 'feeds/{slug}.atom.xml'
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Pagination
DEFAULT_PAGINATION = 10
PAGINATION_PATTERNS = (
    (1, '{base_name}/', '{base_name}/index.html'),
    (2, '{base_name}/page/{number}/', '{base_name}/page/{number}/index.html'),
)

# Static
STATIC_PATHS = ['images', 'extra']
EXTRA_PATH_METADATA = {
    'extra/favicon.svg': {'path': 'favicon.svg'},
    'extra/site.webmanifest': {'path': 'site.webmanifest'},
    'extra/CNAME': {'path': 'CNAME'},
}

# Plugins
PLUGIN_PATHS = []
PLUGINS = ['sitemap', 'neighbors', 'related_posts']

# Sitemap
SITEMAP = {
    'format': 'xml',
    'priorities': {
        'articles': 0.7,
        'indexes': 0.5,
        'pages': 0.7,
    },
    'changefreqs': {
        'articles': 'monthly',
        'indexes': 'daily',
        'pages': 'monthly',
    },
}

# Markdown
MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
        'markdown.extensions.toc': {'permalink': True},
    },
    'output_format': 'html5',
}

# Jinja
JINJA_ENVIRONMENT = {
    'trim_blocks': True,
    'lstrip_blocks': True,
}

# Custom
DIRECT_TEMPLATES = ['index', 'tags', 'categories', 'archives']
TEMPLATE_PAGES = {
    'projects.html': 'projects/index.html',
    'demos.html': 'demos/index.html',
    'blog.html': 'blog/index.html',
    'subnet-calculator.html': 'demos/subnet-calculator.html',
    'packet-header-viz.html': 'demos/packet-header-viz.html',
    'tcp-state-machine.html': 'demos/tcp-state-machine.html',
    '404.html': '404.html',
}

# Social
SOCIAL = (
    ('github', 'https://github.com/HitroBro'),
    ('linkedin', 'https://linkedin.com/in/hitarth-ghia'),
    ('email', 'mailto:ghiahitarth@gmail.com'),
    ('rss', 'https://HitroBro.github.io/feeds/all.atom.xml'),
)

# Navigation
MENUITEMS = (
    ('Home', '/'),
    ('Projects', '/projects/'),
    ('Blog', '/blog/'),
    ('Demos', '/demos/'),
)

# Profile
PROFILE = {
    'name': 'Hitarth Ghia',
    'title': 'Cyber Security Student (CoE Track)',
    'org': 'Parul University',
    'location': 'Vadodara, India',
    'bio': 'Building secure, high-performance network systems. Specializing in Network Infrastructure (CCNA) and Security Automation (Python/C).',
    'avatar': '/images/avatar.svg',
    'skills': [
        {'category': 'Core Systems & Security', 'items': ['C11', 'Python', 'Linux', 'Bash', 'Git', 'Docker', 'Wireshark']},
        {'category': 'Networking & Protocols', 'items': ['TCP/IP', 'epoll', 'io_uring', 'HTTP/1.1', 'DNS', 'BGP/OSPF', 'VLANs']},
        {'category': 'Security', 'items': ['Network Monitoring', 'Automation', 'Hardening', 'CTF', 'OSCP Prep']},
        {'category': 'Web & Tooling', 'items': ['HTML5', 'CSS3', 'Jinja2', 'Pelican', 'Pelican', 'MkDocs']},
    ],
    'currently': [
        '🔭 Building: Async TCP Gateway with eBPF/XDP integration',
        '🧠 Studying: Linux Kernel Networking, BPF Verifier, io_uring',
        '📜 Pursuing: CCNA, OSCP',
    ],
}

# Projects for homepage
FEATURED_PROJECTS = [
    {
        'name': 'Async TCP Layer 4 Gateway',
        'desc': 'High-concurrency epoll-based TCP proxy with round-robin LB, instant failover, async health checks, IPv6 dual-stack, rate limiting, SIGUSR1 metrics',
        'tags': ['C11', 'epoll', 'timerfd', 'signalfd', 'Python Tests'],
        'url': '/projects/async-tcp-gateway/',
        'github': 'https://github.com/HitroBro/async-tcp-gateway',
        'icon': 'network',
        'color': 'green',
    },
    {
        'name': 'NeoShare Local Cloud',
        'desc': 'Zero-dependency HTTP file server with ThreadingHTTPServer, path traversal protection, 2GB upload limit, Range streaming, auto tar.gz, dark mode',
        'tags': ['Python 3', 'ThreadingHTTPServer', 'Zero Deps', 'Range Requests'],
        'url': '/projects/neosahre/',
        'github': 'https://github.com/HitroBro/NeoShare-Local-Cloud',
        'icon': 'server',
        'color': 'blue',
    },
    {
        'name': 'Terminal Portfolio (v1)',
        'desc': 'PyScript/WASM terminal running Python in browser — interactive virtual filesystem, command parser, cyberpunk theme',
        'tags': ['PyScript', 'WebAssembly', 'Python', 'WASM'],
        'url': '/projects/terminal-portfolio/',
        'github': 'https://github.com/HitroBro/HitroBro.github.io',
        'icon': 'terminal',
        'color': 'orange',
    },
]

# Demos
DEMOS = [
    {
        'name': 'Subnet Calculator',
        'desc': 'IPv4/IPv6 CIDR calculator with binary visualization, classful reference, wildcard masks',
        'url': '/demos/subnet-calculator/',
        'tags': ['IPv4/IPv6', 'CIDR', 'Binary View'],
        'icon': 'calculator',
    },
    {
        'name': 'Packet Header Visualizer',
        'desc': 'Interactive Ethernet/IPv4/TCP/UDP header breakdown with live checksum calculation and PCAP export',
        'url': '/demos/packet-header-viz/',
        'tags': ['Ethernet', 'IPv4', 'TCP/UDP', 'PCAP'],
        'icon': 'packet',
    },
    {
        'name': 'TCP State Machine',
        'desc': 'RFC 793 state diagram with animated transitions, event log, educational packet flows',
        'url': '/demos/tcp-state-machine/',
        'tags': ['RFC 793', 'Animation', 'Educational'],
        'icon': 'state-machine',
    },
]

# Footer
COPYRIGHT_YEAR = 2025