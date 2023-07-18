@echo off
setlocal EnableDelayedExpansion

set "folderPath=.\assets_music\music"
set "outputFile=audio_list.txt"
set "tempFile=temp.txt"
set "output="

REM Get .mp3 files
for /r "%folderPath%" %%F in (*.mp3) do (
    for /f "delims=" %%A in ("%%~nF") do set "output=!output!, '%%A'"
)

REM Get .wav files
for /r "%folderPath%" %%F in (*.wav) do (
    for /f "delims=" %%A in ("%%~nF") do set "output=!output!, '%%A'"
)

REM Remove leading comma and space, add brackets
set "output=[%output:~2%]"

REM Write output to file
echo !output! > "%outputFile%"

endlocal
