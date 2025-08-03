param (
    [string]$Message = "Quick Commit"
)

# Get the current date and time
$DateTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Full commit message
$CommitMessage = "$Message ($DateTime)"

Write-Host "=== Starting Quick Push Script ===" -ForegroundColor Cyan

# Ensure we are in a git repo
if (-not (Test-Path ".git")) {
    Write-Host "Error: This folder is not a git repository!" -ForegroundColor Red
    exit
}

# Step 1: Pull latest changes to avoid conflicts
Write-Host "`nPulling latest changes..." -ForegroundColor Yellow
git pull origin main

# Step 2: Add all changes
Write-Host "`nAdding all changes..." -ForegroundColor Yellow
git add .

# Step 3: Commit changes
Write-Host "`nCommitting changes: $CommitMessage" -ForegroundColor Green
git commit -m "$CommitMessage"

# Step 4: Push to origin
Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "`n=== Quick Push Completed Successfully! ===" -ForegroundColor Cyan
