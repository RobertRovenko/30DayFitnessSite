# Re-encodes the ProRes 4444 mockup masters into the alpha formats the site ships.
#
#   .\scripts\encode-videos.ps1            # every clip
#   .\scripts\encode-videos.ps1 -Name home # just the ones matching "home"
#
# Each master produces three files in public/assets/videos/optimized:
#
#   <name>.webm        VP9, yuva420p. Chrome/Firefox/Edge render this alpha
#                      natively in a plain <video>. ~16MB for the five together.
#   <name>.hevc.mp4    The same frames alpha-stacked (colour on top, alpha
#                      underneath) at 1920x2160, hvc1 + faststart. Safari has no
#                      WebM alpha, so StackedAlphaVideo unpacks this in WebGL.
#                      ~5MB for the five together.
#   <name>.png         First frame with its alpha, used as the poster while the
#                      browser capability probe runs and if playback is refused.
#
# Browsers only ever download one of the two video routes, never both.
#
# NOTE on verifying alpha: ffmpeg's *native* VP9 decoder silently drops the WebM
# alpha side-channel, so `ffprobe` reports yuv420p and `alphaextract` fails with
# "Requested planes not available" even when alpha is present and correct. That
# is a limitation of the checker, not of the file. Verify with the libvpx decoder:
#
#   ffmpeg -c:v libvpx-vp9 -i out.webm -vf alphaextract,format=gray,signalstats,metadata=print -f null -

[CmdletBinding()]
param(
    [string]$Name = '',
    [int]$Crf = 30
)

$ErrorActionPreference = 'Continue'

# Resolve ffmpeg: a local build under %LOCALAPPDATA% wins, otherwise whatever is
# on PATH. Must be an ffmpeg with libvpx-vp9 and libx265 (the 9.x builds do).
$local = Get-ChildItem "$env:LOCALAPPDATA\ffmpeg\bin" -Filter 'ffmpeg.exe' -Recurse -ErrorAction SilentlyContinue |
    Select-Object -First 1
$ff = if ($local) { $local.FullName } else { (Get-Command ffmpeg -ErrorAction Stop).Source }
$probe = Join-Path ([IO.Path]::GetDirectoryName($ff)) 'ffprobe.exe'

$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root 'mockupvideos'
$out = Join-Path $root 'public\assets\videos\optimized'

if (-not (Test-Path $src)) { throw "Masters not found: $src" }
New-Item -ItemType Directory -Force -Path $out | Out-Null

# Log lives outside public/ so it never ends up in a deploy.
$log = Join-Path $env:TEMP 'encode-videos.log'
function Say($m) {
    $line = "[{0}] {1}" -f (Get-Date -Format 'HH:mm:ss'), $m
    Write-Host $line
    Add-Content -Path $log -Value $line
}

Say '=== encode run START ==='

# VP9 with native alpha, plus -row-mt 1 to use all 12 threads and -cpu-used 2 so
# the run is tractable (crf/quality is unchanged).
$webmArgs = @('-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-crf', $Crf, '-b:v', '0',
    '-an', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2')

# Alpha stacking: colour on top, alpha plane vstacked underneath for the shader.
# hvc1 rather than hev1 so Safari/iOS will decode it at all.
$stack = '[0:v]format=pix_fmts=yuva444p[main];[main]split[m2][al];[al]alphaextract[a];[m2][a]vstack[st]'
$hevcArgs = @('-filter_complex', $stack, '-map', '[st]',
    '-c:v', 'libx265', '-pix_fmt', 'yuv420p', '-tag:v', 'hvc1',
    '-crf', $Crf, '-preset', 'medium', '-an', '-movflags', '+faststart',
    '-x265-params', 'log-level=error')

$files = Get-ChildItem $src -Filter *.mov | Sort-Object Name
if ($Name) { $files = $files | Where-Object { $_.BaseName -like "*$Name*" } }
if (-not $files) { throw "No masters matched '$Name'" }

$totalIn = 0
$totalOut = 0

foreach ($f in $files) {
    $n = $f.BaseName
    $webm = Join-Path $out "$n.webm"
    $hevc = Join-Path $out "$n.hevc.mp4"
    $png = Join-Path $out "$n.png"

    Say "$n : WebM (VP9 yuva420p crf$Crf)"
    & $ff -y -v error -i $f.FullName @webmArgs $webm
    if ($LASTEXITCODE -ne 0) { throw "$n webm failed ($LASTEXITCODE)" }

    Say "$n : stacked HEVC (1920x2160 hvc1)"
    & $ff -y -v error -i $f.FullName @hevcArgs $hevc
    if ($LASTEXITCODE -ne 0) { throw "$n hevc failed ($LASTEXITCODE)" }

    # Poster: frame 0 with its alpha intact, so the still matches the first frame
    # of the clip and nothing shifts when playback takes over.
    Say "$n : poster"
    & $ff -y -v error -i $f.FullName -frames:v 1 -vf 'scale=960:540:flags=lanczos' `
        -pix_fmt rgba -compression_level 9 $png
    if ($LASTEXITCODE -ne 0) { throw "$n poster failed ($LASTEXITCODE)" }

    $sum = (Get-Item $webm).Length + (Get-Item $hevc).Length + (Get-Item $png).Length
    $totalIn += $f.Length
    $totalOut += $sum
    Say ("  {0}: webm {1:N2} MB, hevc {2:N2} MB, poster {3:N2} MB  ({4:N1}% of {5:N1} MB source)" -f
        $n, ((Get-Item $webm).Length / 1MB), ((Get-Item $hevc).Length / 1MB), ((Get-Item $png).Length / 1MB),
        (($sum / $f.Length) * 100), ($f.Length / 1MB))
}

Say ('=== encode run DONE: {0:N1} MB -> {1:N1} MB ({2:N1}% of source) ===' -f
    ($totalIn / 1MB), ($totalOut / 1MB), (($totalOut / $totalIn) * 100))
Say "log: $log"