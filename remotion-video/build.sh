
#!/bin/sh
remotion render src/index.tsx Video out.mp4
ffmpeg -i out.mp4 -i ./src/assets/audio.mp3 -map 0:v -map 1:a -c:v copy -shortest ./../dist/output.mp4
rm out.mp4
