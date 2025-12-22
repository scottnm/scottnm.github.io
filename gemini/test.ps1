# FIXME: remove; this is just a file to help with tool comparisons
param(
    [Parameter(Mandatory=$true)]
    [string]$MdPath
    )

$outDir = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "gemini-site-output"))
New-Item -ItemType Directory -Force $outDir | Out-Null 

$baseName = (Get-Item $MdPath).BaseName

# generate lowdown for comparison
$lowdownOutput = (Join-Path $outDir "$($baseName)-lowdown.gmi")
$sw = [System.Diagnostics.Stopwatch]::StartNew()
lowdown -tgemini $MdPath -o $lowdownOutput
if (! $?) {
    throw "lowdown failed"
}
write-host "lowdown generated $lowdownOutput :: $($sw.Elapsed)"

$gemgenOutput = (Join-Path $outDir "$($baseName)-gemgen.gmi")
$sw = [System.Diagnostics.Stopwatch]::StartNew()
gemgen -o $outDir $MdPath
if (! $?) {
    throw "gemgen failed"
}
$gemgenTmpFile = (Get-ChildItem (Join-Path $outDir "*.gmi") | `
    Sort-Object -Descending -Property LastWriteTime)[0]
Move-Item $gemgenTmpFile $gemgenOutput
write-host "lowdown generated $gemgenOutput :: $($sw.Elapsed)"

$md2gmiOutput = (Join-Path $outDir "$($baseName)-md2gmi.gmi")
$sw = [System.Diagnostics.Stopwatch]::StartNew()
~/go/bin/md2gmi -i $MdPath -o $md2gmiOutput
if (! $?) {
    throw "md2gmi failed"
}
write-host "lowdown generated $gemgenOutput :: $($sw.Elapsed)"