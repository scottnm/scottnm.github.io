param(
    [Parameter(Mandatory=$true)]
    [string]$MarkdownFilePath,
    [string]$OutputHtmlFileName,
    [string]$OutputHtmlFileDirectory,
    [string]$FmtConfig,
    [switch]$Preview
    )

if (!$FmtConfig)
{
    $FmtConfig = Join-Path $PSScriptRoot ".prettierrc"
}

if (!$OutputHtmlFileDirectory)
{
    $OutputHtmlFileDirectory = (Get-Item $MarkdownFilePath).Directory
}

# ensure our output html file directory is an absolute path
$OutputHtmlFileDirectory = (Get-Item $OutputHtmlFileDirectory).FullName

function Test-CommandExists
{
    param ($command)
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = "stop"
    try {if(Get-Command $command){return $true}}
    catch {Write-Host "$command does not exist"; return $false}
    finally {$ErrorActionPreference=$oldPreference}
}

if (!(Test-CommandExists prettier))
{
    throw "prettier required!`nuse ``npm install -g prettier`` to install!"
}

if (!(Test-Path $MarkdownFilePath))
{
    throw "File not found: $MarkdownFilePath"
}

$MarkdownFile = (Get-Item $MarkdownFilePath)
if ($MarkdownFile.Extension.ToLower() -ne ".md")
{
    throw "File not markdown: $MarkdownFilePath"
}

if (!$OutputHtmlFileName)
{
    $OutputHtmlFileName = $MarkdownFile.BaseName + ".html"
}

Write-Host -ForegroundColor DarkGray "Generating $OutputHtmlFileName from $MarkdownFilePath"

$rawHtml = (ConvertFrom-Markdown $MarkdownFile).html

$fmtFile = Join-Path ([System.IO.Path]::GetTempPath()) "$($MarkdownFile.BaseName)_fmt.html"
Set-Content -path $fmtFile $rawHtml

$output = & prettier --config $FmtConfig --parser html $fmtFile --write 2>&1
if (!$?)
{
    Write-Host "HTML Formatting error(s): $output" -ForegroundColor red
    exit 1
}

if ($Preview)
{
    Get-Content $fmtFile | Write-Host -ForegroundColor DarkGray
}
else
{
    $outputHtmlFilePath = (Join-Path $OutputHtmlFileDirectory $OutputHtmlFileName)
    Copy-Item $fmtFile $outputHtmlFilePath
}
