\# 💻 HitroBro.github.io (Terminal Portfolio)

\*\*A fully interactive, browser-based terminal portfolio powered by Python (PyScript).\*\*



<p align="left">

&nbsp; <img src="https://img.shields.io/badge/Frontend-HTML5%2FCSS3-orange?style=for-the-badge\&logo=html5" />

&nbsp; <img src="https://img.shields.io/badge/Engine-PyScript-yellow?style=for-the-badge\&logo=python" />

&nbsp; <img src="https://img.shields.io/badge/JavaScript-0%25-red?style=for-the-badge\&logo=javascript" />

</p>



---



\### 🚀 Overview

This is not a standard HTML/CSS portfolio. It is a \*\*Virtual Terminal\*\* running directly in the browser using WebAssembly. 



Instead of using JavaScript for logic, this project uses \*\*PyScript\*\* to run a Python backend (`terminal.py`) that handles command parsing, filesystem simulation, and DOM manipulation. It demonstrates the ability to bring backend logic to the frontend.



\### ✨ Key Features

\* \*\*🐍 Python-Powered:\*\* All interactive logic (commands, parsing, history) is written in pure Python.

\* \*\*🐚 Virtual File System:\*\* Simulates a Linux environment with directories, files, and navigation.

\* \*\*📟 Bash Simulation:\*\* Supports standard commands like `ls`, `cd`, `cat`, `pwd`, `whoami`, and `clear`.

\* \*\*🎨 Cyberpunk Aesthetic:\*\* Custom CSS variables for a retro-terminal look with scanlines and glow effects.



---



\### 🛠️ Technical Stack

\* \*\*Core:\*\* \[PyScript](https://pyscript.net/) (Python running in WASM)

\* \*\*Styling:\*\* Custom CSS3 (Flexbox/Grid)

\* \*\*Font:\*\* Fira Code (Nerd Fonts compatible)



---



\### 📦 Local Development

Because PyScript fetches external files (`terminal.py`), this site cannot run by simply double-clicking `index.html` (due to CORS security policies).



To test locally:

```bash

\# 1. Clone the repo

git clone \[https://github.com/HitroBro/HitroBro.github.io.git](https://github.com/HitroBro/HitroBro.github.io.git)



\# 2. Start a Python local server

python -m http.server



\# 3. Open localhost

\# Visit http://localhost:8000

