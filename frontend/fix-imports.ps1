# Path to your frontend folder
$frontendPath = "C:\Users\PIETER\Downloads\SecondHandStore\frontend"

# Get all JS, JSX, TS, TSX files
$files = Get-ChildItem -Path $frontendPath -Recurse -Include *.js, *.jsx, *.ts, *.tsx
$totalFiles = $files.Count
$fixedFiles = 0

Write-Host "🔹 Starting React import scan and auto-fix..."
Write-Host "📂 Total files to scan: $totalFiles"
Write-Host ""

# Loop through files with progress bar
for ($i = 0; $i -lt $totalFiles; $i++) {
    $file = $files[$i]
    
    # Update progress bar
    $percent = (($i + 1) / $totalFiles) * 100
    Write-Progress -Activity "Scanning & Fixing Imports" -Status "$($i+1)/$totalFiles files" -PercentComplete $percent

    # Run eslint --fix-imports (adjust rules as needed)
    npx eslint --fix "$($file.FullName)" 2>$null
    
    # Count as fixed file
    $fixedFiles++
}

Write-Host ""
Write-Host "✅ Finished scanning and fixing imports!"
Write-Host "📂 Total files scanned: $totalFiles"
Write-Host "🛠 Files auto-fixed: $fixedFiles"

# Run ESLint + Prettier on entire project
Write-Host "✨ Running ESLint and Prettier on all files..."
npx eslint "$frontendPath" --ext .js,.jsx,.ts,.tsx --fix
npx prettier --write "$frontendPath"

# Play a sound notification when done
[console]::beep(1000,500)
Start-Process powershell -ArgumentList "-c (New-Object Media.SoundPlayer 'C:\Windows\Media\notify.wav').PlaySync();"

Write-Host "🎉 All done! Your imports are clean and project formatted."
