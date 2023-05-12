import FfmpegCommand from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';

const pathToFfmpeg = require('ffmpeg-static-electron').path;

async function extractNonBlackThumbnail(videoFile: string) {
  const ffmpeg = new FfmpegCommand();
  ffmpeg.setFfmpegPath(pathToFfmpeg);
  // Read the video file

  return new Promise<Blob>((resolve, reject) => {
    ffmpeg
      .input(videoFile)
      .inputFormat('mp4')
      .seekInput(5)
      .frames(1)
      .complexFilter([
        'select=eq(pict_type\\,I), ' +
          'blackframe=amount=2:threshold=92, ' +
          'metadata=print:key=lavfi.blackframe.pblack',
        // 'metadata=print:file=/dev/null:fmt=csv',
      ])
      .output('output.png')
      .on('error', (err) => {
        reject(new Error(err));
      })
      .on('end', () => {
        reject(new Error('Could not extract frame'));
      })
      .on('stderr', (stderrLine) => {
        const [pblack, blackCount] = stderrLine.trim().split(',');
        if (pblack === '0') {
          const frameIndex = parseInt(blackCount, 10) + 1;
          ffmpeg
            .input(videoFile)
            .inputFormat('mp4')
            .seekInput(5)
            .frames(1)
            .outputOptions(`-vf select='eq(n,${frameIndex})'`)
            .output('output.png')
            .on('error', (err) => {
              reject(err);
            })
            .on('end', () => {
              fetch('output.png')
                .then((response) => response.blob())
                .then((blob) => {
                  resolve(blob);
                  return blob;
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .run();
        }
      })
      .run();
  });
}

async function extractThumbnail(videoFile: string): Promise<Buffer> {
  const ffmpeg = new FfmpegCommand();

  ffmpeg.setFfmpegPath(pathToFfmpeg);

  const outputFilePath = path.join(__dirname, 'thumbnail.png');

  return new Promise((resolve, reject) => {
    const thumbnailWidth = 200;

    ffmpeg
      .input(videoFile)
      .outputOptions(['-ss', '00:00:10', '-vframes', '1'])
      .output(outputFilePath)
      .size(`${thumbnailWidth}x?`)
      .on('error', (err) => {
        reject(new Error(`Could not extract thumbnail: ${err.message}`));
      })
      .on('end', () => {
        const buffer = fs.readFileSync(outputFilePath);
        fs.unlinkSync(outputFilePath);
        resolve(buffer);
      })
      .run();
  });
}

async function extractVideoMetadata(
  videoPath: string
): Promise<ffmpeg.FfprobeData> {
  const ffmpeg = new FfmpegCommand();

  ffmpeg.setFfmpegPath(pathToFfmpeg);

  return new Promise((resolve, reject) => {
    ffmpeg
      .input(videoPath)
      .ffprobe(function onFfprobeData(err: any, data: unknown) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
  });
}

export { extractNonBlackThumbnail, extractThumbnail, extractVideoMetadata };
