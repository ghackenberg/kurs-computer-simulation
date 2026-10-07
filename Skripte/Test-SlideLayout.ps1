<#
.SYNOPSIS
    Führt die automatische MARP DOM- & SVG-Layoutvalidierung mittels Headless-Chromium durch.
.DESCRIPTION
    Kompiliert MARP-Foliensätze temporär zu HTML und prüft im echten DOM auf:
    - Vertikalen Überlauf / Clipping (scrollHeight > clientHeight, Footer-Kollision)
    - Horizontalen Überlauf
    - Zu kleine SVG-Diagrammbeschriftungen (effektive Render-Schriftgröße < 11.5px)
.PARAMETER Chapter
    Optional: Kapitelnummer (z.B. '01') oder Pfad zur Folien.md. Standard: 'all'
#>
[CmdletBinding()]
param(
    [string]$Chapter = "all"
)

$scriptPath = Join-Path $PSScriptRoot "lint_slides_dom.js"
node $scriptPath $Chapter
exit $LASTEXITCODE
