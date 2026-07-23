import json

path = r"C:\Users\silva\.gemini\antigravity-ide\brain\b67e811d-e065-499d-9c5c-f76c3caffce7\.system_generated\logs\transcript_full.jsonl"
out_path = r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\extracted_subagent_logs.txt"

lines = []
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

with open(out_path, "w", encoding="utf-8") as out:
    for idx, line in enumerate(lines):
        if "capture_browser_console_logs" in line:
            out.write(f"\n--- TOOL CALL AT LINE {idx} ---\n")
            out.write(line + "\n")
            if idx + 1 < len(lines):
                out.write(f"--- RESPONSE AT LINE {idx+1} ---\n")
                out.write(lines[idx+1] + "\n")
