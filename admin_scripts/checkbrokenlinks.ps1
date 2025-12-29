param(
    [string]$StartUrl = "http://localhost:8081",
    [string[]]$SkipUrls = @("https://linkedin.com/in/scott-munro","gemini://gemini.scottnm.com")
    )

if (! (Get-Command broken-links)) {
    throw "broken-links not installed! Install with ``cargo install broken-links``"
}

$originalDir = Get-Location
try {
    $ReportDir = (Join-Path $PSScriptRoot ".." "broken-links-output")
    Remove-Item -Recurse -Force $ReportDir -ErrorAction SilentlyContinue | Out-Null
    New-Item -ItemType Directory -Force $ReportDir | Out-Null
    cd $ReportDir

    $args = @(
        $StartUrl
    )
    if ($SkipUrls) {
        $skipUrlArg = $SkipUrls -join ","
        $args += "-s"
        $args += $skipUrlArg
    }

    broken-links @args

    $reports = Get-ChildItem "./"
    if ($reports) {
        $reports | %{ Write-Host -foregroundcolor Yellow "Report @ $_"}
    }
}
finally {
    cd $originalDir
}
