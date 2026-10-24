"""Render the original, seamless Tech Stack atmosphere (offline authoring only).

Requires NumPy, Pillow, and FFmpeg with VP9 and H.264 encoders. Set
AMBIENT_FFMPEG to the FFmpeg executable before using --encode.
"""

from __future__ import annotations

import argparse
import math
import os
from pathlib import Path
import subprocess

import numpy as np
from PIL import Image


WIDTH, HEIGHT = 1280, 600
FPS, SECONDS = 24, 12
FRAMES = FPS * SECONDS
ROOT = Path(__file__).resolve().parents[1]
Y, X = np.mgrid[0:HEIGHT, 0:WIDTH].astype(np.float32)
X /= WIDTH
Y /= HEIGHT
EDGE = np.clip(1 - 0.31 * (((X - .5) / .72) ** 2 + ((Y - .5) / .83) ** 2), .55, 1)


def gaussian(cx: float, cy: float, sx: float, sy: float) -> np.ndarray:
    return np.exp(-.5 * (((X - cx) / sx) ** 2 + ((Y - cy) / sy) ** 2))


def add(image: np.ndarray, field: np.ndarray, color: tuple[float, float, float]) -> None:
    image += field[..., None] * color


def orbit(cx: float, cy: float, a: float, b: float, angle: float, phase: float) -> np.ndarray:
    dx = (X - cx) * WIDTH
    dy = (Y - cy) * HEIGHT
    u = (math.cos(angle) * dx + math.sin(angle) * dy) / a
    v = (-math.sin(angle) * dx + math.cos(angle) * dy) / b
    radius = np.sqrt(u * u + v * v)
    contour = np.exp(-.5 * ((radius - 1) / .006) ** 2)
    contour += .2 * np.exp(-.5 * ((radius - 1) / .025) ** 2)
    # A moving highlight crosses each arc. The dim portion remains visible.
    highlight = .43 + .57 * (.5 + .5 * np.sin(3 * np.arctan2(v, u) + phase))
    return contour * highlight


def frame(number: int) -> np.ndarray:
    phase = 2 * math.pi * number / FRAMES
    image = np.empty((HEIGHT, WIDTH, 3), dtype=np.float32)
    image[:] = (7, 24, 33)

    # The luminous band crosses the stage in six seconds and returns along a
    # slightly different curved path. Its broad halo moves with it.
    sweep_x = .5 - .51 * math.cos(phase)
    sweep_y = .49 + .11 * math.sin(phase)
    ribbon = np.exp(-.5 * ((X - sweep_x - .18 * (Y - .5)) / .24) ** 2)
    ribbon *= np.exp(-.5 * ((Y - sweep_y) / .39) ** 2)
    add(image, ribbon, (13, 59, 63))
    add(image, gaussian(sweep_x, sweep_y, .31, .48), (5, 24, 28))

    # One large refracted glass sphere, on a genuinely traveling curved path.
    sphere_x = .5 + .112 * math.sin(phase + .28)
    sphere_y = .51 + .068 * math.cos(phase + .28)
    dx = (X - sphere_x) * WIDTH
    dy = (Y - sphere_y) * HEIGHT
    radius = np.sqrt((dx / 216) ** 2 + (dy / 216) ** 2)
    inside = np.clip((1.012 - radius) * 80, 0, 1)
    rim = np.exp(-.5 * ((radius - .993) / .014) ** 2)
    aura = np.exp(-.5 * ((radius - 1.04) / .13) ** 2)
    # The highlights slide with the sphere; the dark center stays translucent.
    refract = np.exp(-.5 * (((dx + 65) / 116) ** 2 + ((dy + 75) / 115) ** 2))
    underside = np.exp(-.5 * (((dx - 79) / 144) ** 2 + ((dy - 91) / 122) ** 2))
    add(image, aura, (2.5, 14, 17))
    add(image, inside * (.16 + .30 * refract + .17 * underside), (13, 49, 54))
    add(image, inside * refract, (4.5, 22, 23))
    add(image, rim * (.45 + .28 * np.clip((-dx - dy) / 280, -1, 1)), (31, 100, 105))
    add(image, rim * np.clip((dx + dy) / 360, 0, 1), (7, 40, 48))

    # Interlaced orbital contours drift and rotate behind the cards. They
    # complete a full, seamless twelve-second phrase without a fast spin.
    orbit_x = .5 + .045 * math.sin(phase + 1.1)
    orbit_y = .53 + .038 * math.cos(phase + 1.1)
    outer = orbit(orbit_x, orbit_y, 548, 142, -.31 + .16 * math.sin(phase), phase)
    inner = orbit(orbit_x + .015, orbit_y - .026, 384, 191, .43 + .24 * math.sin(phase + .8), 2 * phase + 1.8)
    third = orbit(orbit_x - .018, orbit_y + .02, 464, 112, .16 + .19 * math.cos(phase + .5), phase + 3)
    add(image, outer, (23, 72, 77))
    add(image, inner, (17, 58, 65))
    add(image, third, (9, 35, 43))

    # A few light sources establish depth without relying on tiny particles
    # as the primary visible motion.
    for cx, cy, intensity in (
        (.17 + .06 * math.sin(phase + 2), .25 + .12 * math.cos(phase + 2), .75),
        (.83 + .06 * math.cos(phase + 1), .71 + .1 * math.sin(phase + 1), .8),
        (.66 + .075 * math.sin(phase + 4), .2 + .05 * math.cos(phase + 4), .5),
    ):
        add(image, gaussian(cx, cy, .06, .1) * intensity, (9, 39, 44))
        add(image, gaussian(cx, cy, .009, .019) * intensity, (52, 137, 134))

    # Restrained fixed grain prevents banding. It does not animate or flicker.
    grain = .55 * np.sin(31 * X + 19 * Y) * np.sin(29 * Y - 13 * X)
    image += grain[..., None]
    image *= EDGE[..., None]
    return np.clip(image, 0, 255).astype(np.uint8)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--preview-dir', type=Path)
    parser.add_argument('--encode', action='store_true')
    args = parser.parse_args()

    if args.preview_dir:
        args.preview_dir.mkdir(parents=True, exist_ok=True)
        for second in (0, 2, 4, 6, 8, 10):
            Image.fromarray(frame(second * FPS)).save(args.preview_dir / f'tech-{second:02}.png')

    if not args.encode:
        return

    encoder = os.environ.get('AMBIENT_FFMPEG')
    if not encoder:
        raise SystemExit('Set AMBIENT_FFMPEG to an FFmpeg executable with VP9 and H.264 encoders.')
    media = ROOT / 'public' / 'media'
    images = ROOT / 'public' / 'images'
    media.mkdir(parents=True, exist_ok=True)
    Image.fromarray(frame(0)).save(images / 'techstack-atmosphere-poster.webp', 'WEBP', quality=90, method=6)

    command = [
        encoder, '-hide_banner', '-loglevel', 'error', '-y',
        '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s:v', f'{WIDTH}x{HEIGHT}',
        '-r', str(FPS), '-i', 'pipe:0', '-an',
        '-filter_complex', '[0:v]split=2[web][mp4]',
        '-map', '[web]', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '30',
        '-deadline', 'good', '-cpu-used', '4', '-row-mt', '1', '-pix_fmt', 'yuv420p',
        str(media / 'techstack-atmosphere.webm'),
        '-map', '[mp4]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
        str(media / 'techstack-atmosphere.mp4'),
    ]
    with subprocess.Popen(command, stdin=subprocess.PIPE) as process:
        assert process.stdin is not None
        for number in range(FRAMES):
            process.stdin.write(frame(number).tobytes())
        process.stdin.close()
        if process.wait() != 0:
            raise SystemExit(f'FFmpeg failed with exit code {process.returncode}')


if __name__ == '__main__':
    main()
