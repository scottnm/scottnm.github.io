# TODO: migrate to a python script
param(
    [string]$SiteDir,
    [string]$OutDir,
    [string]$OutTarName,
    [switch]$Upload,
    [string]$UploadToken
    )

if (! $SiteDir) {
    $SiteDir = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "site"))
}

if (! $OutDir) {
    $OutDir = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "gemini-site-output"))
}

if (! $OutTarName) {
    $WipSuffix = if (git status --porcelain) { echo "-wip" } else { "" }
    $OutTarName = "scottnm-gem-site-" + (git rev-parse --short HEAD) + $WipSuffix + ".tar.gz"
}

if ($Upload -and !(Get-Command curl)) {
    throw "Need ``curl`` to upload"
}
if ($Upload -and !$UploadToken) {
    throw "Upload token required"
}

$OutTarPath = (Join-Path $OutDir $OutTarName)

New-Item -ItemType Directory -Force $OutDir | Out-Null 
$tarArgs = @(
    "-cvzf"
    $OutTarPath
    "*"
)
write-host "tar $tarArgs" -foregroundcolor darkgray
pushd $SiteDir
tar @tarArgs 2>&1 | %{ Write-Host -foregroundcolor darkgray "    $_" }
$tarResult = $?
popd
if (!$tarResult)
{
    write-host "Failed to tar archive" -foregroundcolor red
    exit 1
}
write-host "Built $OutTarPath"

if (!$Upload) {
    return
}

$curlArgs = @(
    "--oauth2-bearer"
    $UploadToken 
    "-Fcontent=@$OutTarPath" 
    "-Fprotocol=GEMINI" 
    "https://pages.sr.ht/publish/scottnm.srht.site"
)

Write-Host "curl $curlArgs" -foregroundcolor darkgray
curl @curlArgs
$curlRes = $?
if (! $curlRes) {
    write-host "Failed curl upload" -foregroundcolor red
    exit 1
}