import { BrowserWindow, ipcMain } from 'electron';
import Video from 'renderer/interfaces/video';
import {
  EXTRACT_VIDEO_NON_BLACK_THUMBNAIL,
  EXTRACT_VIDEO_METADATA,
  generateMessageChannel,
  STORE_ADD_VIDEO,
  STORE_REMOVE_VIDEO,
  STORE_HAS_VIDEO,
  STORE_GET_VIDEO_LIST,
  STORE_GET_COUNT,
  STORE_CLEAR,
  STORE_CHANGED,
} from '../consts';
import { extractThumbnail, extractVideoMetadata } from './core/video';
import {
  store,
  storeAddVideo,
  storeGetVideoList,
  storeHasVideo,
  storeRemoveVideo,
} from './core/store';

function initializeIPCListeners(mainWindow: BrowserWindow) {
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

  ipcMain.on(STORE_ADD_VIDEO, async (event, video: Video) => {
    storeAddVideo(video);
  });

  ipcMain.on(STORE_REMOVE_VIDEO, async (event, arg) => {
    const { videoId } = arg;

    storeRemoveVideo(videoId);
  });

  ipcMain.on(STORE_HAS_VIDEO, async (event, arg) => {
    const { videoId } = arg;

    event.reply(generateMessageChannel(STORE_HAS_VIDEO, videoId), {
      hasVideo: storeHasVideo(videoId),
    });
  });

  ipcMain.on(STORE_GET_VIDEO_LIST, async (event, arg) => {
    event.reply(generateMessageChannel(STORE_GET_VIDEO_LIST, arg), {
      videoList: storeGetVideoList(),
    });
  });

  ipcMain.on(STORE_GET_COUNT, async (event, arg) => {
    event.reply(generateMessageChannel(STORE_GET_COUNT, arg), {
      count: storeGetVideoList().length,
    });
  });

  ipcMain.on(STORE_CLEAR, async (event, arg) => {
    storeRemoveVideo(arg);
  });

  store.onDidAnyChange((newValue: any, oldValue: any) => {
    // console.log('Store changed', oldValue, newValue);
    mainWindow.webContents.send(STORE_CHANGED, {
      old: oldValue,
      new: newValue,
    });

    // const rendererProcessCount = BrowserWindow.getAllWindows().filter(
    //   (window) => window.webContents
    // ).length;

    // console.log(
    //   `There are ${rendererProcessCount} renderer processes running.`
    // );
  });
}

export default initializeIPCListeners;
