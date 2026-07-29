#!/usr/bin/env python3
"""Verifica el contenido real de cada imagen procesada."""
from PIL import Image
import os

OUT_DIR = "/home/z/my-project/public/servicios"
files = [
    "servicio-neurologica.png",
    "servicio-deportiva.png",
    "servicio-traumatologica.png",
    "servicio-ocupacional.png",
]

for f in files:
    path = os.path.join(OUT_DIR, f)
    img = Image.open(path).convert("RGB")
    w, h = img.size

    # Detectar bbox de contenido no-blanco
    gray = img.convert("L")
    bw = gray.point(lambda p: 0 if p > 240 else 255)
    bbox = bw.getbbox()

    if bbox:
        content_w = bbox[2] - bbox[0]
        content_h = bbox[3] - bbox[1]
        margin_left = bbox[0]
        margin_right = w - bbox[2]
        margin_top = bbox[1]
        margin_bottom = h - bbox[3]
        print(f"\n{f}:")
        print(f"  Canvas: {w}x{h}")
        print(f"  Contenido: {content_w}x{content_h} en bbox={bbox}")
        print(f"  Margenes L/R/T/B: {margin_left}/{margin_right}/{margin_top}/{margin_bottom}")
        print(f"  Centrado horizontal: {'OK' if abs(margin_left - margin_right) <= 2 else f'NO (diff={abs(margin_left-margin_right)})'}")
        print(f"  Centrado vertical: {'OK' if abs(margin_top - margin_bottom) <= 2 else f'NO (diff={abs(margin_top-margin_bottom)})'}")
