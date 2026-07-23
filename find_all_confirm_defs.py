import re

path = r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\app_v1.js"

with open(path, "r", encoding="utf-8") as f:
    code = f.read()

# Let's find matches for window.showModernConfirm = function
matches = [m.start() for m in re.finditer(r"window\.showModernConfirm\s*=", code)]

for idx, pos in enumerate(matches):
    print(f"\n--- MATCH {idx} (char pos {pos}) ---")
    # print about 40 lines after the match
    sub = code[pos:pos+1500]
    lines = sub.split("\n")
    for i in range(min(35, len(lines))):
        print(lines[i])
