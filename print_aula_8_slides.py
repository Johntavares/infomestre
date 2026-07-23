with open(r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\content_v1.js", "r", encoding="utf-8") as f:
    content = f.read()

import re

# Find the index of the first AULA 8 slide
start_pos = content.find('id: "aula8-revisao"')
if start_pos == -1:
    start_pos = content.find("id: 'aula8-revisao'")

# Let's save the rest of the file into a text file for inspection
with open(r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\aula_8_slides_rest.txt", "w", encoding="utf-8") as out:
    out.write(content[start_pos:])

print("Written resto de aula 8.")
