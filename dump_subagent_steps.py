import json

path = r"C:\Users\silva\.gemini\antigravity-ide\brain\58a31152-d33a-45fb-bba3-f36550007444\.system_generated\logs\transcript_full.jsonl"
out_path = r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\subagent_steps.txt"

with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
last_150 = lines[-150:]

with open(out_path, "w", encoding="utf-8") as out:
    for idx, line in enumerate(last_150):
        real_idx = len(lines) - len(last_150) + idx
        try:
            data = json.loads(line)
            out.write(f"Line {real_idx}: step_index={data.get('step_index')}, source={data.get('source')}, type={data.get('type')}, status={data.get('status')}\n")
            if "tool_calls" in data:
                out.write(f"  Tool calls: {[tc.get('name') for tc in data.get('tool_calls')]}\n")
            if "content" in data and data.get("content"):
                out.write(f"  Content snippet: {data.get('content')[:120]}...\n")
        except Exception as e:
            out.write(f"Line {real_idx}: failed to parse JSON: {e}\n")
print("Done writing subagent steps dump.")
