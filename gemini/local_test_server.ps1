param(
    [int]$Port
    )

$args = @(
    "jetforce"
)

if ($Port) {
    $args += "--port"
    $args += $Port
}

start-process `
    -WorkingDirectory (Join-Path $PSScriptRoot "site") `
    -FilePath (Join-Path $HOME ".local" "bin" "uvx") `
    -ArgumentList $args