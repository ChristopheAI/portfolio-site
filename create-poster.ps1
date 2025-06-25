# PowerShell script to create poster image from video
Write-Host "Creating poster image from Stock2coat demo video..." -ForegroundColor Green

# Check if ffmpeg is available
if (!(Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "Error: ffmpeg not found. Please restart PowerShell after installation." -ForegroundColor Red
    exit 1
}

# Create poster image at 2 seconds into the video
$inputVideo = "src/assets/images/stock2coat-demo.mp4"
$outputPoster = "src/assets/images/stock2coat-poster.jpg"

# Generate poster image
Write-Host "Extracting frame at 2 seconds..." -ForegroundColor Yellow
ffmpeg -i $inputVideo -ss 00:00:02 -vframes 1 -q:v 2 $outputPoster -y

if ($LASTEXITCODE -eq 0) {
    Write-Host "Poster image created successfully: $outputPoster" -ForegroundColor Green
} else {
    Write-Host "Failed to create poster image" -ForegroundColor Red
}

# Also create WebM video for better compression
$outputWebM = "src/assets/images/stock2coat-demo.webm"

Write-Host "Converting video to WebM format..." -ForegroundColor Yellow
ffmpeg -i $inputVideo -c:v libvpx-vp9 -crf 30 -b:v 0 $outputWebM -y

if ($LASTEXITCODE -eq 0) {
    Write-Host "WebM video created successfully: $outputWebM" -ForegroundColor Green
    
    # Show file sizes
    $mp4Size = (Get-Item $inputVideo).Length / 1MB
    $webmSize = (Get-Item $outputWebM).Length / 1MB
    $reduction = [math]::Round((1 - ($webmSize / $mp4Size)) * 100, 1)
    
    Write-Host "File Size Comparison:" -ForegroundColor Cyan
    Write-Host "  MP4:  $([math]::Round($mp4Size, 2)) MB" -ForegroundColor White
    Write-Host "  WebM: $([math]::Round($webmSize, 2)) MB" -ForegroundColor White
    Write-Host "  Size reduction: $reduction%" -ForegroundColor Green
} else {
    Write-Host "Failed to create WebM video" -ForegroundColor Red
}

Write-Host "Video optimization complete!" -ForegroundColor Green 