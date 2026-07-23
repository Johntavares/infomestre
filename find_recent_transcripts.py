import os
import time

brain_dir = r"C:\Users\silva\.gemini\antigravity-ide\brain"
now = time.time()
one_day = 24 * 60 * 60

print("Recent transcript files:")
for root, dirs, files in os.walk(brain_dir):
    for file in files:
        if file in ("transcript.jsonl", "transcript_full.jsonl"):
            full_path = os.path.join(root, file)
            mtime = os.path.getmtime(full_path)
            # Check if modified within the last 24 hours
            if now - mtime < one_day:
                mtime_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(mtime))
                print(f" {full_path} (Modified: {mtime_str})")
