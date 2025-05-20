# run gen.py to generate the index.html file
$genPyPath = Join-Path $PSScriptRoot "gen.py"
$indexDestinationPath = Join-Path $PSScriptRoot ".." "index.html"
python $genPyPath > $indexDestinationPath
# fix line endings. ugh.
$text = [IO.File]::ReadAllText($indexDestinationPath) -replace "`r`n", "`n"
[IO.File]::WriteAllText($indexDestinationPath, $text)