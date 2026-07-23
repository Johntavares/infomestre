import json

path = r"C:\Users\silva\.gemini\antigravity-ide\brain\b67e811d-e065-499d-9c5c-f76c3caffce7\.system_generated\logs\transcript_full.jsonl"

with open(path, "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "capture_browser_console_logs" in line:
            print(f"Match at line {idx}:")
            try:
                data = json.loads(line)
                # Print the step details and keys
                print(f"  step_index={data.get('step_index')}, type={data.get('type')}, source={data.get('source')}")
                if "tool_calls" in data:
                    print("  Tool call args:", [tc.get("args") for tc in data.get("tool_calls")])
                if "content" in data:
                    print("  Content:", data["content"][:200])
            except Exception as e:
                print(f"  Error parsing: {e}")
