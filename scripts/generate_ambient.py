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
    drift_x = X + 0.026 * np.sin(2.7 * Y + phase)
    drift_y = Y + 0.022 * np.cos(3.1 * X - phase)

    # Broad light fields cross the stage on separate paths. Their changing
    # centers make the motion legible even beneath the site's dark overlay.
    low_cloud = ellipse(0.16 + 0.13 * math.sin(phase), 0.76 + 0.08 * math.cos(phase), 0.30, 0.38, drift_x, drift_y)
    high_cloud = ellipse(0.81 + 0.12 * math.cos(phase + 0.6), 0.28 + 0.085 * math.sin(phase + 0.6), 0.31, 0.33, drift_x, drift_y)
    mid_cloud = ellipse(0.52 + 0.105 * math.sin(phase + 2.1), 0.50 + 0.06 * math.cos(phase + 2.1), 0.30, 0.44, drift_x, drift_y)
    diagonal = np.exp(-((Y - (0.74 - 0.20 * X + 0.07 * np.sin(2.5 * X + phase))) / 0.26) ** 2)
    diagonal *= ellipse(0.48 + 0.09 * math.sin(phase + 1.3), 0.62, 0.54, 0.42)
    current = np.exp(-((Y - (0.69 + 0.06 * np.sin(4.2 * X + phase))) / 0.23) ** 2) * ellipse(0.5, 0.68, 0.5, 0.4)

    light = np.zeros((HEIGHT, WIDTH, 3), dtype=np.float32)
    light[:] = (5.0, 20.0, 29.0)
    light += low_cloud[..., None] * (8.0, 37.0, 43.0) * (0.9 + 0.1 * math.cos(phase + 0.4))
    light += high_cloud[..., None] * (8.0, 33.0, 39.0) * (0.9 + 0.1 * math.sin(phase + 1.1))
    light += mid_cloud[..., None] * (3.0, 14.0, 18.0)
    light += diagonal[..., None] * (2.0, 10.0, 12.0)
    light += current[..., None] * (2.0, 9.0, 13.0)

    # Soft light sources have distinct paths and depths; their small cores
    # remain luminous without turning into particle effects or hard dots.
    orbs = (
        (0.79 + 0.12 * math.sin(phase + 0.9), 0.31 + 0.085 * math.cos(phase + 0.9), 0.12, 0.019, (18.0, 71.0, 76.0)),
        (0.18 + 0.11 * math.sin(phase + 3.2), 0.72 + 0.09 * math.cos(phase + 3.2), 0.11, 0.017, (13.0, 57.0, 61.0)),
        (0.53 + 0.085 * math.cos(phase + 1.7), 0.19 + 0.07 * math.sin(phase + 1.7), 0.075, 0.014, (7.0, 31.0, 37.0)),
    )
    for cx, cy, halo_width, core_width, color in orbs:
        distance = np.sqrt(((X - cx) * 1.25) ** 2 + (Y - cy) ** 2)
        halo = np.exp(-0.5 * (distance / halo_width) ** 2)
        core = np.exp(-0.5 * (distance / core_width) ** 2)
        light += (0.42 * halo + 0.9 * core)[..., None] * color * (0.94 + 0.06 * math.sin(phase + cx))

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
        '-map', '[web]', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '31',
        '-deadline', 'good', '-cpu-used', '4', '-row-mt', '1', '-pix_fmt', 'yuv420p',
        str(media_dir / 'ambient-teal.webm'),
        '-map', '[mp4]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23',
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
