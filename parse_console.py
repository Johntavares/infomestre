import json

path = r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica\extracted_subagent_logs.txt"

with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Let's find occurrences of "RESPONSE AT LINE"
lines = text.split("\n")
for i, line in enumerate(lines):
    if "RESPONSE AT LINE" in line:
        print(f"Response header: {line}")
        # The next line contains the JSON string of the step response
        if i + 1 < len(lines):
            try:
                data = json.loads(lines[i+1])
                # Print the content which contains the console logs
                content = data.get("content", "")
                print(f"Content length: {len(content)}")
                if "logs" in content or "error" in content.lower() or len(content) < 500:
                    print(content[:500])
            except Exception as e:
                print(f"Failed to parse: {e}")
                print(lines[i+1][:200])
