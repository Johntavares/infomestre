path = r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\app_v1.js"

with open(path, "r", encoding="utf-8") as f:
    code = f.read()

import re
# Find all lines containing addEventListener
matches = [m.start() for m in re.finditer(r"addEventListener", code)]
print(f"Total addEventListener matches: {len(matches)}")

for idx, pos in enumerate(matches):
    # Find start and end of the line
    line_start = code.rfind("\n", 0, pos) + 1
    line_end = code.find("\n", pos)
    line = code[line_start:line_end].strip()
    
    # We are interested in submit or click listeners that might be related to login, logout, or forms
    if "click" in line.lower() or "submit" in line.lower():
        # print line number and content
        line_num = code[:pos].count("\n") + 1
        print(f"Line {line_num}: {line}")
