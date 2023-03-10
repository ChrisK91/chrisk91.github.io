ffmpeg -r 30 -f image2 -s 800x50 -i bit%03d.png -vcodec libx264 -crf 0 -pix_fmt yuv420p output.mp4
ffmpeg -i output.mp4 -c:v libvpx -b:v 1M -c:a libvorbis output.webm
ffmpeg -y -i "output.mp4" -c:v libx264 -preset slow -crf 0 -pix_fmt yuv420p -c:a libvo_aacenc -b:a 128k "web.mp4"