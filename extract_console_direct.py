import json

path = r"C:\Users\silva\.gemini\antigravity-ide\brain\b67e811d-e065-499d-9c5c-f76c3caffce7\.system_generated\logs\transcript_full.jsonl"

with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    try:
        data = json.loads(line)
    except Exception:
        continue
    
    # We want to check if this step called capture_browser_console_logs
    has_call = False
    if "tool_calls" in data:
        for tc in data["tool_calls"]:
            if tc.get("name") == "capture_browser_console_logs":
                has_call = True
                
    if has_call:
        print(f"Tool call at step {data.get('step_index')}")
        # Let's find the response to this tool call. The response is the next step of type 'SYSTEM'
        # or the step immediately following this in the subagent's trajectory.
        # Let's look at the next few lines
        for j in range(idx + 1, min(idx + 5, len(lines))):
            try:
                next_data = json.loads(lines[j])
                if next_data.get("type") == "SYSTEM" or "output" in next_data:
                    print(f"Response at line {j}:")
                    # truncate if too long
                    out_str = str(next_data.get("content", next_data.get("output", "")))
                    print(out_str[:1500])
                    break
            except Exception:
                pass
