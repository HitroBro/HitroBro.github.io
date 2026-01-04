from pyscript import document
from js import window
import datetime

# --- VIRTUAL FILE SYSTEM ---
file_system = {
    "~": {
        "type": "dir",
        "children": {
            "projects": {
                "type": "dir",
                "children": {
                    "neoshare.txt": {
                        "type": "file", 
                        "content": ">> PROJECT: NeoShare\n>> TYPE: Local Cloud Server\n>> TECH: Python, Sockets, Threading\n>> STATUS: Public\n--------------------------------\nA zero-dependency, multi-threaded HTTP server built from scratch.\nGitHub: https://github.com/HitroBro/NeoShare-Local-Cloud"
                    },
                    "modern-ytdlp.txt": {
                        "type": "file", 
                        "content": ">> PROJECT: Modern-YTDLP-GUI\n>> TYPE: Desktop App\n>> TECH: Tkinter, FFmpeg, AsyncIO\n>> STATUS: Public\n--------------------------------\nA professional GUI for yt-dlp with non-blocking threads.\nGitHub: https://github.com/HitroBro/Modern-YTDLP-GUI"
                    },
                    "403-forbidden.txt": {
                        "type": "file", 
                        "content": ">> PROJECT: 403-Forbidden\n>> TYPE: Security Tool\n>> TECH: Bluetooth (BLE), Scapy\n>> STATUS: Coming Soon\n--------------------------------\nResearch tool for analyzing Bluetooth Low Energy vulnerabilities."
                    },
                    "README.md": {
                        "type": "file",
                        "content": "# Projects Directory\nContains source code for all major portfolio items."
                    }
                }
            },
            "about.txt": {
                "type": "file",
                "content": ">> IDENTITY: Hitarth Ghia\n>> ROLE: Cyber Security Student (CoE)\n>> LOCATION: Parul University, India\n>> FOCUS: Network Security, Python Automation, Linux Hardening."
            },
            "contact.md": {
                "type": "file",
                "content": ">> GitHub: github.com/HitroBro\n>> Email: [Restricted for Security]"
            },
            "skills.log": {
                "type": "file",
                "content": "[OK] Python Scripting\n[OK] Linux Administration\n[OK] Network Forensics\n[OK] Web Exploitation (OWASP)"
            }
        }
    }
}

# --- STATE MANAGEMENT ---
current_path = ["~"]

def get_current_dir():
    # Traverse the dictionary based on current_path
    curr = file_system["~"]
    for folder in current_path[1:]:
        curr = curr["children"][folder]
    return curr

def update_prompt():
    path_str = "/".join(current_path).replace("~", "~")
    if len(current_path) > 1:
        path_str = "~/" + "/".join(current_path[1:])
    
    document.getElementById("prompt-text").innerText = f"root@hitrobro:{path_str}$"

# --- COMMAND HANDLERS ---
def cmd_ls(args):
    curr = get_current_dir()
    items = []
    for name, data in curr["children"].items():
        if data["type"] == "dir":
            items.append(f"<span style='color: #58a6ff; font-weight: bold;'>{name}/</span>")
        else:
            items.append(name)
    return "  ".join(items)

def cmd_cd(args):
    global current_path
    if not args:
        current_path = ["~"]
        update_prompt()
        return ""
    
    target = args[0]
    
    if target == "..":
        if len(current_path) > 1:
            current_path.pop()
            update_prompt()
        return ""
    
    if target == "~":
        current_path = ["~"]
        update_prompt()
        return ""

    curr = get_current_dir()
    if target in curr["children"] and curr["children"][target]["type"] == "dir":
        current_path.append(target)
        update_prompt()
        return ""
    elif target in curr["children"]:
        return f"bash: cd: {target}: Not a directory"
    else:
        return f"bash: cd: {target}: No such file or directory"

def cmd_cat(args):
    if not args: return "Usage: cat <filename>"
    target = args[0]
    curr = get_current_dir()
    
    if target in curr["children"]:
        if curr["children"][target]["type"] == "file":
            return curr["children"][target]["content"]
        else:
            return f"cat: {target}: Is a directory"
    else:
        return f"cat: {target}: No such file or directory"

def cmd_pwd(args):
    path_str = "/" + "/".join(current_path).replace("~", "home/hitrobro")
    return path_str

def cmd_whoami(args):
    return "root"

def cmd_date(args):
    return str(datetime.datetime.now())

def cmd_help(args):
    return """
    GNU bash, version 5.1.16(1)-release
    These shell commands are defined internally:
    
    ls [dir]    : List directory contents
    cd [dir]    : Change the shell working directory
    cat [file]  : Concatenate and print files
    pwd         : Print name of current/working directory
    clear       : Clear the terminal screen
    whoami      : Print effective userid
    date        : Print the system date and time
    """

# --- MAIN INPUT HANDLER ---
def handle_command(event):
    if event.key != "Enter":
        return

    input_el = document.getElementById("cmd-input")
    raw_cmd = input_el.value.strip()
    if not raw_cmd: return
    
    parts = raw_cmd.split()
    cmd = parts[0].lower()
    args = parts[1:]
    
    input_el.value = ""
    
    # Add to history
    history = document.getElementById("history")
    prompt_text = document.getElementById("prompt-text").innerText
    
    old_line = document.createElement("div")
    old_line.className = "history-line"
    old_line.innerHTML = f'<span class="prompt">{prompt_text}</span> {raw_cmd}'
    history.appendChild(old_line)

    # Execute
    response = ""
    if cmd == "ls": response = cmd_ls(args)
    elif cmd == "cd": response = cmd_cd(args)
    elif cmd == "cat": response = cmd_cat(args)
    elif cmd == "pwd": response = cmd_pwd(args)
    elif cmd == "whoami": response = cmd_whoami(args)
    elif cmd == "date": response = cmd_date(args)
    elif cmd == "help": response = cmd_help(args)
    elif cmd == "clear": 
        history.innerHTML = ""
        return
    elif cmd == "sudo":
        response = "root is not in the sudoers file. This incident will be reported."
    elif cmd == "exit":
        window.close() 
        response = "Session terminated."
    else:
        response = f"{cmd}: command not found"

    # Render response
    if response:
        resp_div = document.createElement("div")
        resp_div.className = "response"
        resp_div.innerHTML = response.replace("\n", "<br>")
        history.appendChild(resp_div)

    # Scroll
    term_body = document.getElementById("terminal-output")
    term_body.scrollTop = term_body.scrollHeight

document.getElementById("cmd-input").onkeypress = handle_command