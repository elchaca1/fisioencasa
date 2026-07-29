#!/usr/bin/env python3
"""
Analiza y corrige las 4 imágenes de servicios:
1. Detecta y corrige rotación (la primera imagen está girada 90°)
2. Recorta márgenes blancos/transparentes
3. Centra el contenido en un canvas 4:3 con fondo blanco
4. Guarda como PNG optimizado
"""
import os
from PIL import Image

SRC_DIR = "/home/z/my-project/upload"
OUT_DIR = "/home/z/my-project/public/servicios"

IMAGES = {
    "T NEURO.png": "servicio-neurologica.png",
    "T DEPOR.png": "servicio-deportiva.png",
    "T TRAUMA.png": "servicio-traumatologica.png",
    "T OCUPACIONAL.png": "servicio-ocupacional.png",
}

# T NEURO está girada 90° en sentido horario -> rotar 270° (= -90°) para enderezar
ROTATIONS = {
    "T NEURO.png": Image.ROTATE_270,
    "T DEPOR.png": None,
    "T TRAUMA.png": None,
    "T OCUPACIONAL.png": None,
}


def trim_whitespace(img):
    """Recorta bordes blancos o casi blancos."""
    if img.mode == "RGBA":
        bg = Image.new("RGB", img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3])
        gray = bg.convert("L")
    else:
        gray = img.convert("L")

    bw = gray.point(lambda p: 0 if p > 240 else 255)
    bbox = bw.getbbox()
    if bbox:
        pad = 8
        left = max(0, bbox[0] - pad)
        top = max(0, bbox[1] - pad)
        right = min(img.width, bbox[2] + pad)
        bottom = min(img.height, bbox[3] + pad)
        img = img.crop((left, top, right, bottom))
    return img


def to_canvas_with_bg(img, canvas_size=(800, 600), bg_color=(255, 255, 255)):
    """Coloca la imagen centrada sobre un canvas con fondo blanco."""
    target_w, target_h = canvas_size
    canvas = Image.new("RGBA", (target_w, target_h), bg_color + (255,))

    img_w, img_h = img.size
    scale = min(target_w / img_w, target_h / img_h)
    new_w = int(img_w * scale)
    new_h = int(img_h * scale)

    if img.mode != "RGBA":
        img = img.convert("RGBA")
    img_resized = img.resize((new_w, new_h), Image.LANCZOS)

    offset_x = (target_w - new_w) // 2
    offset_y = (target_h - new_h) // 2
    canvas.paste(img_resized, (offset_x, offset_y), img_resized)
    return canvas


def process_image(src_name, dst_name):
    src_path = os.path.join(SRC_DIR, src_name)
    dst_path = os.path.join(OUT_DIR, dst_name)

    print(f"\n=== Procesando {src_name} -> {dst_name} ===")
    img = Image.open(src_path)
    print(f"  Tamano original: {img.size}, modo: {img.mode}")

    rotation = ROTATIONS.get(src_name)
    if rotation is not None:
        if img.mode != "RGBA":
            img = img.convert("RGBA")
        img = img.transpose(rotation)
        print(f"  Rotacion aplicada. Nuevo tamano: {img.size}")

    before_size = img.size
    img = trim_whitespace(img)
    print(f"  Tras recorte de margenes: {img.size} (antes: {before_size})")

    canvas = to_canvas_with_bg(img, canvas_size=(800, 600))
    print(f"  Canvas final: {canvas.size}")

    canvas.save(dst_path, "PNG", optimize=True)
    file_size_kb = os.path.getsize(dst_path) / 1024
    print(f"  Guardado: {dst_path} ({file_size_kb:.1f} KB)")


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for src, dst in IMAGES.items():
        process_image(src, dst)
    print("\nTodas las imagenes procesadas correctamente")


if __name__ == "__main__":
    main()
