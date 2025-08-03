Write-Host "🔹 Starting auto-update of API calls..." -ForegroundColor Cyan

$projectPath = "C:\Users\PIETER\Downloads\SecondHandStore\frontend\src"
$jsFiles = Get-ChildItem -Path $projectPath -Recurse -Include *.js, *.jsx

foreach ($file in $jsFiles) {
    (Get-Content $file.PSPath) |
    ForEach-Object {
        $_ -replace "fetch\('/api/products'\)", "fetch(API_ENDPOINTS.products)" `
           -replace "fetch\('/api/users'\)", "fetch(API_ENDPOINTS.users)" `
           -replace "axios.get\('/api/products'\)", "axios.get(API_ENDPOINTS.products)" `
           -replace "axios.get\('/api/users'\)", "axios.get(API_ENDPOINTS.users)"
    } | Set-Content $file.PSPath
    Write-Host "✅ Updated $($file.FullName)" -ForegroundColor Green
}

Write-Host "🎉 All frontend API calls are now updated to use config.js!" -ForegroundColor Cyan
