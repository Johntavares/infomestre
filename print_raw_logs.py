import json

path = r"C:\Users\silva\.gemini\antigravity-ide\brain\58a31152-d33a-45fb-bba3-f36550007444\.system_generated\logs\transcript_full.jsonl"
out_path = r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\subagent_raw_console_logs.txt"

with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

with open(out_path, "w", encoding="utf-8") as out:
    for idx, line in enumerate(lines):
        try:
            data = json.loads(line)
            out.write(f"\n--- STEP {data.get('step_index')} (line {idx}) ---\n")
            out.write(f"Source: {data.get('source')}, Type: {data.get('type')}\n")
            if "content" in data:
                out.write(f"Content: {data.get('content')}\n")
            if "tool_calls" in data:
                out.write(f"Tool calls: {json.dumps(data.get('tool_calls'), indent=2)}\n")
            if "output" in data:
                out.write(f"Output: {data.get('output')}\n")
        except Exception as e:
            out.write(f"Error parsing line {idx}: {e}\n")
print("Done dumping subagent transcript.")
