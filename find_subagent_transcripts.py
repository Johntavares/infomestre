import os
import json

brain_dir = r"C:\Users\silva\.gemini\antigravity-ide\brain"
out_path = r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\extracted_subagent_logs.txt"

print(f"Searching in {brain_dir}...")
matches = []

# Walk through all directories in brain_dir
for root, dirs, files in os.walk(brain_dir):
    for file in files:
        if file == "transcript_full.jsonl":
            full_path = os.path.join(root, file)
            # Try to see if this transcript contains capture_browser_console_logs
            try:
                with open(full_path, "r", encoding="utf-8") as f:
                    for line in f:
                        if "capture_browser_console_logs" in line:
                            matches.append(full_path)
                            break
            except Exception:
                pass

print(f"Found {len(matches)} matching transcript files:")
for m in matches:
    print(m)

# Let's extract the console log responses from the matched transcripts
with open(out_path, "w", encoding="utf-8") as out:
    for m in matches:
        out.write(f"\n==================================================\n")
        out.write(f"TRANSCRIPT: {m}\n")
        out.write(f"==================================================\n")
        try:
            with open(m, "r", encoding="utf-8") as f:
                lines = f.readlines()
            for idx, line in enumerate(lines):
                if "capture_browser_console_logs" in line:
                    out.write(f"\n--- TOOL CALL AT LINE {idx} ---\n")
                    out.write(line + "\n")
                    if idx + 1 < len(lines):
                        out.write(f"--- RESPONSE AT LINE {idx+1} ---\n")
                        out.write(lines[idx+1] + "\n")
        except Exception as e:
            out.write(f"Error reading transcript: {e}\n")

print("Finished extraction.")
