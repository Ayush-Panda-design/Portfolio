# Replace portfolio demo videos with high-quality exports (1080p recommended).
# Usage:
#   1. Put source files in Portfolio/video-sources/ (see names below)
#   2. Run: .\scripts\optimize-demo-videos.ps1

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")

$sources = Join-Path $root "video-sources"
$outDir = Join-Path $root "public\videos"
New-Item -ItemType Directory -Force -Path $sources, $outDir | Out-Null

$map = @{
  "edinform"  = "edinform-demo.mp4"
  "shipflow"  = "shipflow-demo.mp4"
  "relvion"   = "relvion-demo.mp4"
  "votora"    = "votora-demo.mp4"
}

function Find-Source($key) {
  $patterns = @("$key.mp4", "$key-demo.mp4", "${key}*.mp4")
  foreach ($p in $patterns) {
    $hit = Get-ChildItem -Path $sources -Filter $p -File -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($hit) { return $hit.FullName }
  }
  return $null
}

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  Write-Host "ffmpeg not found. Install: winget install Gyan.FFmpeg" -ForegroundColor Red
  exit 1
}

foreach ($key in $map.Keys) {
  $src = Find-Source $key
  $dest = Join-Path $outDir $map[$key]

  if (-not $src) {
    Write-Host "Skip $key — no source in video-sources/ (expected $key.mp4)" -ForegroundColor Yellow
    continue
  }

  Write-Host "Encoding $key -> $($map[$key]) ..." -ForegroundColor Cyan

  ffmpeg -y -i $src `
    -vf "scale='min(1920,iw)':-2:flags=lanczos" `
    -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p `
    -movflags +faststart `
    -an `
    $dest

  ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 $dest
}

Write-Host "Done. Refresh portfolio to preview." -ForegroundColor Green
