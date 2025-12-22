param(
    [string]$SiteDir,
    [int]$Port
    )

if (! $SiteDir) {
    $SiteDir = (Join-Path $PSScriptRoot "site")
}

$args = @(
    "jetforce"
)

if ($Port) {
    $args += "--port"
    $args += $Port
}

start-process `
    -WorkingDirectory $SiteDir `
    -FilePath (Join-Path $HOME ".local" "bin" "uvx") `
    -ArgumentList $args