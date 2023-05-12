import { ipcMain } from 'electron';
import {
  EXTRACT_VIDEO_NON_BLACK_THUMBNAIL,
  generateMessageChannel,
} from '../consts';
import { extractThumbnail } from './core/video';

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
}

export default initializeIPCListeners;
