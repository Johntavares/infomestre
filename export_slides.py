import sys
import os
import win32com.client

def export_pptx_to_images(pptx_path, output_folder):
    pptx_path = os.path.abspath(pptx_path)
    output_folder = os.path.abspath(output_folder)
    
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    powerpoint = win32com.client.Dispatch("PowerPoint.Application")
    powerpoint.Visible = 1
    
    try:
        presentation = powerpoint.Presentations.Open(pptx_path)
        
        for i, slide in enumerate(presentation.Slides):
            # Export each slide as PNG
            image_path = os.path.join(output_folder, f"slide_{i+1}.png")
            slide.Export(image_path, "PNG")
            print(f"Exported {image_path}")
            
        presentation.Close()
    except Exception as e:
        print(f"Error exporting slides: {e}")
    finally:
        powerpoint.Quit()

if __name__ == "__main__":
    if len(sys.argv) > 2:
        export_pptx_to_images(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python export_slides.py <pptx_path> <output_folder>")
