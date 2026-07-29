#!/usr/bin/env python3
"""
Genera versiones optimizadas del logo en alta resolución (2x y 3x)
para que se vea nítido en pantallas retina/high-DPI.
Usa Lanczos (mejor algoritmo de reescalado) y guarda como PNG optimizado.
"""
from PIL import Image
import os

SRC = "/home/z/my-project/upload/logo.png"
OUT_DIR = "/home/z/my-project/public"

# Tamaños target: el logo se muestra a size-9 (36px), size-8 (32px) en UI
# Para pantallas retina necesitamos 2x y 3x: 72px y 108px mínimo
# Pero damos más resolución para nitidez: 144px y 216px
SIZES = {
    "logo-1x.png": 48,   # base 36px con margen
    "logo-2x.png": 96,   # retina 2x
    "logo-3x.png": 144,  # retina 3x
    # También un logo.png de alta resolución como respaldo
    "logo.png": 192,     # alta resolución para cualquier uso
}

def main():
    img = Image.open(SRC)
    print(f"Origen: {img.size}, modo: {img.mode}")

    # Asegurar RGBA para mejor manejo de transparencia
    if img.mode != "RGBA":
        img = img.convert("RGBA")

    os.makedirs(OUT_DIR, exist_ok=True)

    for filename, target_size in SIZES.items():
        out_path = os.path.join(OUT_DIR, filename)
        # Reescalar con Lanczos (mejor calidad para imágenes con bordes definidos)
        resized = img.resize((target_size, target_size), Image.LANCZOS)
        # Optimizar PNG
        resized.save(out_path, "PNG", optimize=True)
        size_kb = os.path.getsize(out_path) / 1024
        print(f"  {filename}: {target_size}x{target_size} ({size_kb:.1f} KB)")

    print("\nLogos optimizados generados correctamente")

if __name__ == "__main__":
    main()
