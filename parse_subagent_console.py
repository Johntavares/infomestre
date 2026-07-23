import json
import re

path = r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\extracted_subagent_logs.txt"

with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Let's split by TRANSCRIPT:
sections = text.split("TRANSCRIPT: ")
for sec in sections:
    if not sec.strip():
        continue
    lines = sec.split("\n")
    header = lines[0]
    print(f"\n==================================================")
    print(f"TRANSCRIPT FILE: {header}")
    print(f"==================================================")
    
    # Now look for RESPONSE AT LINE
    for idx, line in enumerate(lines):
        if "RESPONSE AT LINE" in line:
            # The next line is the JSON line of the response
            if idx + 1 < len(lines):
                json_str = lines[idx+1]
                try:
                    data = json.loads(json_str)
                    print(f"Keys in data: {list(data.keys())}")
                    output_text = ""
                    if "content" in data:
                        output_text = str(data["content"])
                    elif "output" in data:
                        output_text = str(data["output"])
                    elif "response" in data:
                        output_text = str(data["response"])
                    else:
                        output_text = json.dumps(data)
                    print(f"Output snippet: {output_text[:300]}")
                    try:
                        logs = json.loads(output_text)
                        print(f"Found {len(logs)} console logs:")
                        for log in logs:
                            text_val = log.get("text", "")
                            level = log.get("level", "")
                            url = log.get("url", "")
                            line_num = log.get("line", "")
                            print(f" [{level.upper()}] {text_val} (at {url}:{line_num})")
                    except Exception:
                        pass
                except Exception as e:
                    print(f"Failed to parse line {idx+1}: {e}")
