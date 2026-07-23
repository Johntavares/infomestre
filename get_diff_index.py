import subprocess

cmd = ["git", "diff", "index.html"]
res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, cwd=r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica")
diff = res.stdout.decode("utf-8", errors="ignore")

lines = diff.split("\n")
print(f"Total lines of diff in index.html: {len(lines)}")

changed_lines = []
for idx, line in enumerate(lines):
    if (line.startswith("+ ") or line.startswith("- ")) and not (line.startswith("+++") or line.startswith("---")):
        changed_lines.append((idx, line))

print(f"Found {len(changed_lines)} changed lines in index.html:")
for idx, line in changed_lines[:100]:
    clean_line = line.encode('ascii', 'ignore').decode('ascii')
    print(f"  Line {idx}: {clean_line}")
