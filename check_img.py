from PIL import Image

image_path = r"C:\Users\silva\.gemini\antigravity-ide\brain\432079f5-4499-48e9-a8e7-470c2886a727\.user_uploaded\media_1788184577239.png"
try:
    img = Image.open(image_path)
    print(f"Image dimensions: {img.size}")
except Exception as e:
    print(f"Error: {e}")
