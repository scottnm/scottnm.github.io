param(
    [Parameter(Mandatory=$true)]
    [string]$Name,
    [string]$PostTitleOverride
    )

$today = Get-Date

$sanitizedName = (($Name -replace "[^a-zA-Z0-9 ]",'') -replace "\s+","_").ToLower()

$postBaseName = "{0:yyyy_MM_dd}_{1}" -f $today,$sanitizedName

write-host "sanitized name: $sanitizedName"
write-host "Post basename: $postBaseName"

$siteGenRoot = (Join-Path $PSScriptRoot "..")
$siteGenRoot = [System.IO.Path]::GetFullPath($siteGenRoot)
$pagesRoot = (Join-Path $siteGenRoot "pages")
$newPostDir = (Join-Path $pagesRoot $sanitizedName)

New-Item -ItemType Directory -Force $newPostDir | Out-Null 
echo "" > (Join-Path $newPostDir "$($postBaseName).md")