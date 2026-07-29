#!/usr/bin/env python3
"""
Genera versión de alta calidad del logo con:
- Mayor resolución (512x512) para cualquier pantalla retina
- Filtro UnsharpMask para bordes definidos
- Optimización PNG máxima
"""
from PIL import Image, ImageFilter
import os

SRC = "/home/z/my-project/upload/logo.png"
OUT = "/home/z/my-project/public/logo.png"

def main():
    img = Image.open(SRC)
    print(f"Origen: {img.size}, modo: {img.mode}")

    if img.mode != "RGBA":
        img = img.convert("RGBA")

    # Reescalar a 512x512 con Lanczos (mejor algoritmo)
    target = 512
    resized = img.resize((target, target), Image.LANCZOS)
    print(f"Reescalado a: {resized.size}")

    # Aplicar UnsharpMask para mejorar bordes (amount moderado, threshold bajo)
    # amount=1.5, radius=1.0, threshold=2 — sutil pero efectivo
    sharpened = resized.filter(ImageFilter.UnsharpMask(
        radius=1.0,
        percent=150,
        threshold=2
    ))
    print("UnsharpMask aplicado")

    # Guardar con optimización máxima
    sharpened.save(OUT, "PNG", optimize=True)
    size_kb = os.path.getsize(OUT) / 1024
    print(f"\nGuardado: {OUT}")
    print(f"Tamaño: {target}x{target} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    main()
