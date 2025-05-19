param(
    [Parameter(Mandatory=$true)]
    [string]$MarkdownFilePath,
    [string]$OutputHtmlFileDirectory,
    [string]$OutputHtmlFileName,
    [string]$TidyConfig = "$PSScriptRoot\tidy.config",
    [switch]$Preview
    )

throw "New blog-posts will miss h-card metadata. please don't use this or fix it first."

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

function Get-TitleFromMarkdown
{
    param($markdownFile)

    $fileContents = (Get-Content $markdownFile)
    return $fileContents[0].split("# ")[1]
}

function Get-RelativeResourcePath
{
    param(
        [string]$path,
        [string]$sourceRelativePathFull
        )

    $pathFull = (Get-Item (Join-Path $PSScriptRoot $path)).FullName

    $offset = 0;
    $pathFullPieces = $pathFull -split "\\"
    $sourceRelativePathFullPieces = $sourceRelativePathFull -split "\\"
    for ($i = 0; ($i -lt $pathFullPieces.Length) -and ($i -lt $sourceRelativePathFullPieces.Length); $i++)
    {
        if ($pathFullPieces[$i] -eq $sourceRelativePathFullPieces[$i])
        {
            $offset += $pathFullPieces[$i].Length + 1;
        }
        else
        {
            break;
        }
    }

    $directoryCount = 0
    $s = if ($offset -lt $sourceRelativePathFull.Length) { $sourceRelativePathFull.Substring($offset) } else { "" }
    if ($s -ne "")
    {
        $directoryCount = 1
        while ((split-path $s -parent) -ne "")
        {
            $directoryCount += 1
            $s = (split-path $s -parent)
        }
    }

# write-host "directory count: $directoryCount"

    $relativePath = $path
    for ($i = 0; $i -lt $directoryCount; $i++)
    {
        $relativePath = Join-Path ".." $relativePath
    }

# write-host "relative: $relativePath"

    return ($relativePath -replace "\\", "/")
}

function Format-Blog
{
    param(
        [Parameter(Mandatory=$true)][string]$Title,
        [Parameter(Mandatory=$true)][string[]]$Body
        )

$filledTemplate = @"
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="icon" href="/site_images/icon/favicon.ico" sizes="16x16">
    <link rel="icon" href="/site_images/icon/favicon.ico" sizes="48x48">
    <link rel="icon" href="/site_images/icon/favicon.svg" sizes="any" type="image/svg+xml">
    <link rel="stylesheet" href="/styles.css" >

    <title>scottnm: $Title</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1">
</head>

<body>
    <header>
        <div id="header-pane" class="section-with-buffer">
            <div id="header-with-links-container">
                <a class="home-btn" href="/">
                    <h1 class="title-text">Scott Munro</h1>
                    <img class="title-icon u-photo" src="/site_images/icon/favicon.svg" alt="" loading="lazy" width="20" height="20" >
                </a>
                <hr class="header-links-separator" >
                <a class="social-btn" href="https://github.com/scottnm" title="check out my code on github"
                    target="_blank">github</a>
                <span> | </span>
                <a class="social-btn" href="/atomfeed.xml" title="subscribe via atom/rss feeds" rel="subscribe-rss"
                    target="_blank">rss</a>
                <span> | </span>
                <a class="social-btn" href="mailto:me@scottnm.com" title="shoot me an email">email</a>
                <span> | </span>
                <a class="social-btn" href="https://linkedin.com/in/scott-munro" title="connect with me on linkedin"
                    target="_blank">linkedin</a>
            </div>
        </div>
    </header>

    <section>
        <div>
$Body
        </div>
    </section>
</body>

</html>
"@

    return $filledTemplate
}

if (!(Test-CommandExists tidy))
{
    throw "html-tidy required!`nUse ``choco install html-tidy`` to install!"
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

Write-Host -foregroundcolor DarkGray "Generating $OutputHtmlFileName from $MarkdownFilePath"

$blogTitle = Get-TitleFromMarkdown $MarkdownFile
$rawBlogBodyHtml = (ConvertFrom-Markdown $MarkdownFile).html

$rawHtml = Format-Blog -Title $blogTitle -Body $rawBlogBodyHtml

$errorsFile = Join-Path $env:tmp "$($MarkdownFile.BaseName)_tidyerrors.txt"
$formattedHtml = ($rawHtml | tidy -config $TidyConfig -f $errorsFile)
if (!$?)
{
    Write-Host "Formatting error(s):" -foregroundcolor red
    Get-Content $errorsFile | Write-Host -foregroundcolor red
    throw "Failed to format html for $OutputHtmlFileName"
}

if ($Preview)
{
    $formattedHtml | Write-Host -foregroundcolor DarkGray
}
else
{
    $outputHtmlFilePath = (Join-Path $OutputHtmlFileDirectory $OutputHtmlFileName)
    Set-Content -path $outputHtmlFilePath $formattedHtml
}
