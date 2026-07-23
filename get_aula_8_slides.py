with open(r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\content_v1.js", "r", encoding="utf-8") as f:
    content = f.read()

import re
slides = re.findall(r"\{\s*id:\s*['\"].*?['\"]\s*,\s*chapter:\s*['\"]AULA 8['\"].*?\}", content, re.DOTALL)

with open(r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\aula_8_slides.txt", "w", encoding="utf-8") as out:
    out.write(f"Found {len(slides)} slides:\n\n")
    for s in slides:
        out.write(s + "\n")
        out.write("-" * 50 + "\n")
print("Done writing slides.")
