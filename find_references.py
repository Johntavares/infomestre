import os

terms = ["landing-login-form", "landing-login-email", "landing-login-password"]
workspace_dir = r"C:\Users\silva\.gemini\antigravity-ide\scratch\curso-informatica-basica"

for file in os.listdir(workspace_dir):
    if file.endswith(".js"):
        full_path = os.path.join(workspace_dir, file)
        try:
            with open(full_path, "r", encoding="utf-8") as f:
                for idx, line in enumerate(f):
                    for term in terms:
                        if term in line:
                            print(f"{file}:{idx+1}: {line.strip()}")
        except Exception as e:
            print(f"Error reading {file}: {e}")
