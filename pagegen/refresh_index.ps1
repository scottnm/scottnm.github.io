# run gen.py to generate the index.html file
$genPyPath = Join-Path $PSScriptRoot "gen.py"
# FIXME: remove "redesign_" from filename after merging in the redesign stuff 
$indexDestinationPath = Join-Path $PSScriptRoot ".." "redesign_index.html"
python $genPyPath > $indexDestinationPath
# fix line endings. ugh.
$text = [IO.File]::ReadAllText($indexDestinationPath) -replace "`r`n", "`n"
[IO.File]::WriteAllText($indexDestinationPath, $text)