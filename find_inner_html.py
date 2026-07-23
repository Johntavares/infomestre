path = r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\app_v1.js"

with open(path, "r", encoding="utf-8") as f:
    code = f.read()

import re
matches = [m.start() for m in re.finditer(r"\.innerHTML\s*=", code)]
print(f"Total innerHTML assignments: {len(matches)}")

for idx, pos in enumerate(matches):
    line_start = code.rfind("\n", 0, pos) + 1
    line_end = code.find("\n", pos)
    line = code[line_start:line_end].strip()
    line_num = code[:pos].count("\n") + 1
    
    # We want to see what is being set
    # Let's print the line number and the line
    print(f"Line {line_num}: {line.encode('ascii', 'ignore').decode('ascii')}")
