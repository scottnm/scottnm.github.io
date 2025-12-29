param(
    [string]$StartUrl = "http://localhost:8081",
    [string[]]$SkipUrls = @("https://linkedin.com/in/scott-munro","gemini://gemini.scottnm.com")
    )

if (! (Get-Command broken-links)) {
    throw "broken-links not installed! Install with ``cargo install broken-links``"
}

$args = @(
    $StartUrl
)
if ($SkipUrls) {
    $skipUrlArg = $SkipUrls -join ","
    $args += "-s"
    $args += $skipUrlArg
}

broken-links @args
