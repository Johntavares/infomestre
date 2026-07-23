import json

path = r"C:\Users\silva\.gemini\antigravity-ide\brain\58a31152-d33a-45fb-bba3-f36550007444\.system_generated\logs\transcript_full.jsonl"

with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    try:
        data = json.loads(line)
    except Exception:
        continue
    
    # We want to check if this step has capture_browser_console_logs call or response
    has_call = False
    if "tool_calls" in data:
        for tc in data["tool_calls"]:
            if tc.get("name") == "capture_browser_console_logs":
                has_call = True
                
    if has_call:
        print(f"\n--- MATCH AT STEP {data.get('step_index')} (line {idx}) ---")
        if idx + 1 < len(lines):
            try:
                next_data = json.loads(lines[idx+1])
                print("Keys in response:", list(next_data.keys()))
                # Response is usually inside next_data["content"] or next_data["output"]
                content = next_data.get("content", next_data.get("output", ""))
                # If content is a dict (like a tool output structure), print it
                if isinstance(content, dict):
                    print(json.dumps(content, indent=2))
                else:
                    # If it's a string, maybe it's JSON encoded logs
                    try:
                        logs = json.loads(content)
                        print(json.dumps(logs, indent=2))
                    except Exception:
                        print(content)
            except Exception as e:
                print("Failed to print response:", e)
