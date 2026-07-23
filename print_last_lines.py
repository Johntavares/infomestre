import json

path = r"C:\Users\silva\.gemini\antigravity-ide\brain\58a31152-d33a-45fb-bba3-f36550007444\.system_generated\logs\transcript_full.jsonl"
out_path = r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\subagent_raw_console_logs.txt"

with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total lines in transcript: {len(lines)}")
# Let's inspect the last 500 lines
last_lines = lines[-1000:]

with open(out_path, "w", encoding="utf-8") as out:
    for idx, line in enumerate(last_lines):
        line_idx = len(lines) - len(last_lines) + idx
        try:
            data = json.loads(line)
        except Exception:
            continue
        
        has_call = False
        if "tool_calls" in data:
            for tc in data["tool_calls"]:
                if tc.get("name") == "capture_browser_console_logs":
                    has_call = True
                    
        if has_call:
            out.write(f"\n--- MATCH AT STEP {data.get('step_index')} (line {line_idx}) ---\n")
            # Find the next line that contains the response
            for j in range(idx + 1, min(idx + 5, len(last_lines))):
                try:
                    next_data = json.loads(last_lines[j])
                    if next_data.get("type") == "SYSTEM" or "output" in next_data:
                        content = next_data.get("content", next_data.get("output", ""))
                        out.write(content + "\n")
                        break
                except Exception:
                    pass
print("Done extracting recent console logs.")
