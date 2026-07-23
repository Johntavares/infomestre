with open(r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\content_v1.js", "r", encoding="utf-8") as f:
    content = f.read()

import re

# Split slides by parsing JSON-like structures in content_v1.js
# The COURSE_CONTENT array contains slides
# Let's find all slide definitions
slide_matches = re.findall(r"\{\s*id:\s*['\"].*?['\"].*?chapter:\s*['\"]AULA 8['\"].*?\}", content, re.DOTALL)

print(f"Total AULA 8 slides: {len(slide_matches)}")
for s in slide_matches:
    id_match = re.search(r"id:\s*['\"](.*?)['\"]", s)
    title_match = re.search(r"title:\s*['\"](.*?)['\"]", s)
    int_match = re.search(r"interactiveId:\s*['\"](.*?)['\"]", s)
    
    sid = id_match.group(1) if id_match else "unknown"
    title = title_match.group(1) if title_match else "unknown"
    int_id = int_match.group(1) if int_match else "none"
    
    print(f"ID: {sid} | Title: {title} | Interactive: {int_id}")
