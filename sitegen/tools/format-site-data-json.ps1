$siteGenRoot = (Join-Path $PSScriptRoot "..")
$siteDataPath = (Join-Path $siteGenRoot "site_data" "site_data.json")
$tmpFile = New-TemporaryFile
python3 -m json.tool $siteDataPath $tmpFile
Move-Item -Force $tmpFile $siteDataPath