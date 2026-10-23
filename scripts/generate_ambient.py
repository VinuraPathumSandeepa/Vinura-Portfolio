"""Render the original, seamless ambient lighting loop.

Offline authoring tool only. Requires NumPy, Pillow and an FFmpeg binary with
libvpx-vp9 and libx264. Set AMBIENT_FFMPEG to the encoder path before running.
The React application has no dependency on this script or its Python packages.
"""

from __future__ import annotations

import argparse
import math
import os
from pathlib import Path
import subprocess

import numpy as np
from PIL import Image


WIDTH, HEIGHT = 1280, 720
FPS, SECONDS = 24, 10
FRAMES = FPS * SECONDS
ROOT = Path(__file__).resolve().parents[1]
X, Y = np.meshgrid(
    (np.arange(WIDTH, dtype=np.float32) + 0.5) / WIDTH,
    (np.arange(HEIGHT, dtype=np.float32) + 0.5) / HEIGHT,
)


def ellipse(cx: float, cy: float, sx: float, sy: float, x=X, y=Y):
    return np.exp(-0.5 * (((x - cx) / sx) ** 2 + ((y - cy) / sy) ** 2))


def frame(number: int) -> np.ndarray:
    # Every movement is periodic over exactly ten seconds, including the
    # curved light field. The final frame therefore flows into frame zero.
    phase = 2 * math.pi * number / FRAMES
    drift_x = X + 0.018 * np.sin(2.7 * Y + phase)
    drift_y = Y + 0.015 * np.cos(3.1 * X - phase)

    low_cloud = ellipse(0.16 + 0.045 * math.sin(phase), 0.74 + 0.045 * math.cos(phase), 0.31, 0.39, drift_x, drift_y)
    high_cloud = ellipse(0.82 + 0.05 * math.cos(phase + 0.6), 0.29 + 0.055 * math.sin(phase + 0.6), 0.34, 0.35, drift_x, drift_y)
    mid_cloud = ellipse(0.53 + 0.045 * math.sin(phase + 2.1), 0.49, 0.33, 0.47, drift_x, drift_y)
    current = np.exp(-((Y - (0.66 + 0.035 * np.sin(4.2 * X + phase))) / 0.22) ** 2) * ellipse(0.5, 0.65, 0.5, 0.4)

    light = np.zeros((HEIGHT, WIDTH, 3), dtype=np.float32)
    light[:] = (5.0, 20.0, 29.0)
    light += low_cloud[..., None] * (8.0, 34.0, 40.0)
    light += high_cloud[..., None] * (7.0, 28.0, 36.0)
    light += mid_cloud[..., None] * (2.0, 12.0, 17.0)
    light += current[..., None] * (2.0, 9.0, 13.0)

    # Soft light sources have distinct paths and depths; their small cores
    # remain luminous without turning into particle effects or hard dots.
    orbs = (
        (0.80 + 0.045 * math.sin(phase + 0.9), 0.32 + 0.05 * math.cos(phase + 0.9), 0.11, 0.016, (17.0, 71.0, 73.0)),
        (0.18 + 0.035 * math.sin(phase + 3.2), 0.71 + 0.06 * math.cos(phase + 3.2), 0.10, 0.014, (12.0, 55.0, 59.0)),
        (0.53 + 0.025 * math.cos(phase + 1.7), 0.19 + 0.035 * math.sin(phase + 1.7), 0.065, 0.012, (6.0, 27.0, 34.0)),
    )
    for cx, cy, halo_width, core_width, color in orbs:
        distance = np.sqrt(((X - cx) * 1.25) ** 2 + (Y - cy) ** 2)
        halo = np.exp(-0.5 * (distance / halo_width) ** 2)
        core = np.exp(-0.5 * (distance / core_width) ** 2)
        light += (0.45 * halo + 0.95 * core)[..., None] * color

    # A restrained fixed texture keeps the gradient from looking flat and
    # improves the appearance of 8-bit video compression.
    texture = 0.55 * np.sin(31 * X + 19 * Y) * np.sin(27 * Y - 11 * X)
    light += texture[..., None]
    vignette = 1 - 0.19 * np.clip(((X - 0.5) / 0.74) ** 2 + ((Y - 0.5) / 0.8) ** 2, 0, 1)
    light *= vignette[..., None]
    return np.clip(light, 0, 255).astype(np.uint8)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--preview-dir', type=Path)
    parser.add_argument('--encode', action='store_true')
    args = parser.parse_args()

    if args.preview_dir:
        args.preview_dir.mkdir(parents=True, exist_ok=True)
        for i in (0, FRAMES // 4, FRAMES // 2, 3 * FRAMES // 4):
            Image.fromarray(frame(i)).save(args.preview_dir / f'ambient-{i:03}.png')

    if not args.encode:
        return

    encoder = os.environ.get('AMBIENT_FFMPEG')
    if not encoder:
        raise SystemExit('Set AMBIENT_FFMPEG to an FFmpeg executable with VP9 and H.264 encoders.')
    media_dir = ROOT / 'public' / 'media'
    image_dir = ROOT / 'public' / 'images'
    media_dir.mkdir(parents=True, exist_ok=True)
    Image.fromarray(frame(0)).save(image_dir / 'ambient-teal-poster.webp', 'WEBP', quality=88, method=6)

    command = [
        encoder, '-hide_banner', '-loglevel', 'error', '-y',
        '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s:v', f'{WIDTH}x{HEIGHT}',
        '-r', str(FPS), '-i', 'pipe:0', '-an',
        '-filter_complex', '[0:v]split=2[web][mp4]',
        '-map', '[web]', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '39',
        '-deadline', 'good', '-cpu-used', '4', '-row-mt', '1', '-pix_fmt', 'yuv420p',
        str(media_dir / 'ambient-teal.webm'),
        '-map', '[mp4]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '29',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
        str(media_dir / 'ambient-teal.mp4'),
    ]
    with subprocess.Popen(command, stdin=subprocess.PIPE) as process:
        assert process.stdin is not None
        for i in range(FRAMES):
            process.stdin.write(frame(i).tobytes())
        process.stdin.close()
        if process.wait() != 0:
            raise SystemExit(f'FFmpeg failed with exit code {process.returncode}')


if __name__ == '__main__':
    main()
