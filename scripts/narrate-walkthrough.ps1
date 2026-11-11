param([string]$Voice = 'Microsoft Hazel Desktop')
$ErrorActionPreference = 'Stop'
$repositoryPath = Split-Path -Parent $PSScriptRoot
$audioPath = Join-Path $repositoryPath 'artifacts/portfolio-refresh/audio'
New-Item -ItemType Directory -Path $audioPath -Force | Out-Null
$scenes = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'walkthrough-scenes.json') -Raw | ConvertFrom-Json
Add-Type -AssemblyName System.Speech
$narrator = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
    $narrator.SelectVoice($Voice)
    $narrator.Rate = 0
    for ($index = 0; $index -lt $scenes.Count; $index++) {
        $outputPath = Join-Path $audioPath ('scene-{0:00}.wav' -f ($index + 1))
        $narrator.SetOutputToWaveFile($outputPath)
        $narrator.Speak($scenes[$index].text)
        $narrator.SetOutputToNull()
    }
} finally {
    $narrator.Dispose()
}
Write-Output ('Created {0} narration tracks using {1}.' -f $scenes.Count, $Voice)
