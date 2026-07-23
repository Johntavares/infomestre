import os
import time

brain_dir = r"C:\Users\silva\.gemini\antigravity-ide\brain"

print("All entries in brain:")
try:
    for entry in os.scandir(brain_dir):
        mtime = entry.stat().st_mtime
        mtime_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(mtime))
        print(f" {'[DIR]' if entry.is_dir() else '[FILE]'} {entry.name} (Modified: {mtime_str})")
except Exception as e:
    print(f"Error: {e}")
