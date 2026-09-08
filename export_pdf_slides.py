import sys
import fitz  # PyMuPDF
import os

def export_pdf_to_images(pdf_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    doc = fitz.open(pdf_path)
    
    # Scale up for high resolution. zoom=2.0 means 144 DPI instead of 72 DPI
    zoom_x = 2.0  
    zoom_y = 2.0  
    mat = fitz.Matrix(zoom_x, zoom_y)
    
    for i in range(len(doc)):
        page = doc.load_page(i)
        pix = page.get_pixmap(matrix=mat)
        
        slide_number = i + 1
        output_path = os.path.join(output_dir, f"slide_{slide_number}.png")
        
        pix.save(output_path)
        print(f"Exported {output_path}")

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    output_dir = sys.argv[2]
    export_pdf_to_images(pdf_path, output_dir)
