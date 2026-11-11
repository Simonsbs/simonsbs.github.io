"""Export real browser captures and a captioned, synthetically narrated walkthrough.

Capture the public applications with the supported browser tools first. This script
only formats those files. It does not create or alter application states.
"""
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
import textwrap
import wave

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
WORK = ROOT / "artifacts/portfolio-refresh"
CAPTURES = WORK / "captures"
PUBLIC = ROOT / "public"
scenes = json.loads((ROOT / "scripts/walkthrough-scenes.json").read_text(encoding="utf-8"))

for capture in CAPTURES.glob("*.png"):
    # The browser backend returns JPEG bytes. Keep the capture extension honest.
    if Image.open(capture).format == "JPEG":
        capture.rename(capture.with_suffix(".jpg"))

def source_image(name):
    path = CAPTURES / name
    if not path.exists():
        path = path.with_suffix(".jpg")
    return Image.open(path).convert("RGB")

image_dir = PUBLIC / "images/projects"
image_dir.mkdir(parents=True, exist_ok=True)
for project_id in ["knowledge-lab", "integration-lab", "presales-workbench", "traceability-lab", "workflow-lab"]:
    original = source_image(project_id + ".jpg")
    thumbnail = Image.new("RGB", (1200, 800), "#141715")
    fitted = ImageOps.contain(original, (1200, 800), Image.Resampling.LANCZOS)
    thumbnail.paste(fitted, ((1200 - fitted.width) // 2, (800 - fitted.height) // 2))
    thumbnail.save(image_dir / (project_id + ".webp"), "WEBP", quality=88, method=6)

frames_dir = WORK / "frames"
frames_dir.mkdir(parents=True, exist_ok=True)
font_path = Path("C:/Windows/Fonts")
title_font = ImageFont.truetype(str(font_path / "segoeuib.ttf"), 28)
body_font = ImageFont.truetype(str(font_path / "segoeui.ttf"), 22)
small_font = ImageFont.truetype(str(font_path / "segoeui.ttf"), 15)

def timestamp(seconds):
    millis = round(seconds * 1000)
    hours, millis = divmod(millis, 3600000)
    minutes, millis = divmod(millis, 60000)
    seconds, millis = divmod(millis, 1000)
    return f"{hours:02}:{minutes:02}:{seconds:02}.{millis:03}"

durations = []
audio_chunks = []
audio_parameters = None
vtt = ["WEBVTT", ""]
elapsed = 0.0
for index, scene in enumerate(scenes, start=1):
    audio_file = WORK / "audio" / f"scene-{index:02}.wav"
    with wave.open(str(audio_file), "rb") as audio:
        parameters = (audio.getnchannels(), audio.getsampwidth(), audio.getframerate())
        if audio_parameters is not None and parameters != audio_parameters:
            raise ValueError("All narration tracks must use the same PCM format")
        audio_parameters = parameters
        data = audio.readframes(audio.getnframes())
        seconds = audio.getnframes() / audio.getframerate()
    pause_frames = round(0.45 * parameters[2])
    audio_chunks.append(data + bytes(pause_frames * parameters[0] * parameters[1]))
    duration = seconds + pause_frames / parameters[2]
    durations.append(duration)
    vtt.extend([str(index), f"{timestamp(elapsed)} --> {timestamp(elapsed + seconds)}", scene["text"], ""])
    elapsed += duration

    canvas = Image.new("RGB", (1280, 960), "#101612")
    draw = ImageDraw.Draw(canvas)
    draw.text((32, 20), f"{index:02} / {len(scenes):02}   {scene['title']}", font=title_font, fill="#f0f0e7")
    draw.text((32, 63), "INTEGRATION LAB   |   ACTUAL APPLICATION SCREENSHOTS   |   SYNTHETIC NARRATION", font=small_font, fill="#b9cba9")
    image = ImageOps.contain(source_image(scene["image"]), (1216, 700), Image.Resampling.LANCZOS)
    canvas.paste(image, (32 + (1216 - image.width) // 2, 105 + (700 - image.height) // 2))
    lines = textwrap.wrap(scene["text"], width=104)
    for line_number, line in enumerate(lines):
        draw.text((32, 830 + line_number * 29), line, font=body_font, fill="#f0f0e7")
    draw.rectangle((32, 943, 1248, 948), fill="#344231")
    draw.rectangle((32, 943, 32 + round(1216 * index / len(scenes)), 948), fill="#c7edaa")
    canvas.save(frames_dir / f"scene-{index:02}.png")

audio_output = WORK / "narration.wav"
with wave.open(str(audio_output), "wb") as output:
    output.setnchannels(audio_parameters[0])
    output.setsampwidth(audio_parameters[1])
    output.setframerate(audio_parameters[2])
    output.writeframes(b"".join(audio_chunks))

concat_path = frames_dir / "frames.ffconcat"
concat_lines = ["ffconcat version 1.0"]
for index, duration in enumerate(durations, start=1):
    concat_lines.extend([f"file 'scene-{index:02}.png'", f"duration {duration:.6f}"])
concat_lines.append(f"file 'scene-{len(scenes):02}.png'")
concat_path.write_text("\n".join(concat_lines) + "\n", encoding="utf-8")
media_dir = PUBLIC / "media"
media_dir.mkdir(parents=True, exist_ok=True)
(media_dir / "integration-lab-walkthrough.vtt").write_text("\n".join(vtt), encoding="utf-8", newline="\n")

ffmpeg = shutil.which("ffmpeg")
if not ffmpeg:
    sys.path.insert(0, str(WORK / "python"))
    import imageio_ffmpeg
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
video_path = media_dir / "integration-lab-walkthrough.mp4"
subprocess.run([
    ffmpeg, "-y", "-hide_banner", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(concat_path),
    "-i", str(audio_output), "-vf", "fps=24,format=yuv420p", "-c:v", "libx264", "-preset", "medium", "-crf", "23",
    "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", "-t", f"{elapsed:.3f}", "-shortest", str(video_path)
], check=True)
report = {"durationSeconds": round(elapsed, 3), "sceneCount": len(scenes), "narration": "Microsoft Hazel Desktop, synthetic en-GB speech", "source": "Actual public demo screenshots captured through the supported browser tools", "videoBytes": video_path.stat().st_size, "videoSha256": hashlib.sha256(video_path.read_bytes()).hexdigest()}
(WORK / "media-report.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
print(json.dumps(report, indent=2))
