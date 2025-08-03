# Fix-ReactImports.ps1
$projectPath = "C:\Users\PIETER\Downloads\SecondHandStore\frontend"
Set-Location $projectPath

Write-Host "🔹 Scanning project for invalid React imports..." -ForegroundColor Cyan

$files = Get-ChildItem -Path "$projectPath\src" -Recurse -Include *.js,*.jsx,*.ts,*.tsx |
    Where-Object { $_.FullName -notmatch 'node_modules' }

$totalFiles = $files.Count
$fileIndex = 0

foreach ($file in $files) {
    $fileIndex++
    $progress = [math]::Round(($fileIndex / $totalFiles) * 100, 2)
    Write-Progress -Activity "Scanning React imports..." -Status "$progress% [$fileIndex of $totalFiles files]" -PercentComplete $progress

    $content = Get-Content $file.FullName -Raw

    # Remove invalid: import { use } from 'react';
    $fixedContent = $content -replace 'import\s*{\s*use\s*}\s*from\s*["'']react["''];?', ''

    # Fix: import React5 from 'react'; -> import React from 'react';
    $fixedContent = $fixedContent -replace 'import\s+React[0-9]*\s+from\s+["'']react["''];?', 'import React from "react";'

    if ($fixedContent -ne $content) {
        Set-Content -Path $file.FullName -Value $fixedContent
        Write-Host ("✅ Fixed: " + $file.Name) -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "🎉 Scan complete. All invalid React imports have been fixed!" -ForegroundColor Green
