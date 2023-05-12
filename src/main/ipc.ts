import { ipcMain } from 'electron';
import {
  EXTRACT_VIDEO_NON_BLACK_THUMBNAIL,
  EXTRACT_VIDEO_METADATA,
  generateMessageChannel,
} from '../consts';
import { extractThumbnail, extractVideoMetadata } from './core/video';

function initializeIPCListeners() {
  ipcMain.on(EXTRACT_VIDEO_NON_BLACK_THUMBNAIL, async (event, arg) => {
    const { videoPath, videoId } = arg;

    const thumbnailBuffer = await extractThumbnail(videoPath);

    event.reply(
      generateMessageChannel(EXTRACT_VIDEO_NON_BLACK_THUMBNAIL, videoId),
      {
        thumbnailBuffer,
        thumbnailFormat: 'image/png',
      }
    );
  });

  ipcMain.on(EXTRACT_VIDEO_METADATA, async (event, arg) => {
    const { videoPath, videoId } = arg;

    const metadata = await extractVideoMetadata(videoPath);

    event.reply(generateMessageChannel(EXTRACT_VIDEO_METADATA, videoId), {
      metadata,
    });
  });
}

export default initializeIPCListeners;
