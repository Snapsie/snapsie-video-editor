import { BrowserWindow, ipcMain } from 'electron';
import Video from 'renderer/interfaces/video';
import {
  EXTRACT_VIDEO_NON_BLACK_THUMBNAIL,
  EXTRACT_VIDEO_METADATA,
  generateMessageChannel,

  // Video Store
  STORE_ADD_VIDEO,
  STORE_REMOVE_VIDEO,
  STORE_HAS_VIDEO,
  STORE_GET_VIDEO_LIST,
  STORE_GET_COUNT,
  STORE_CLEAR,
  VIDEO_STORE_CHANGED,

  // Timeline Store
  STORE_ADD_VIDEO_TO_TIMELINE,
  STORE_REMOVE_VIDEO_FROM_TIMELINE,
  STORE_UPDATE_VIDEO_IN_TIMELINE,
  STORE_GET_VIDEOS_IN_TIMELINE,
  TIMELINE_STORE_CHANGED,
} from '../consts';
import { extractThumbnail, extractVideoMetadata } from './core/video';
import {
  videoStore,
  storeAddVideo,
  storeGetVideoList,
  storeHasVideo,
  storeRemoveVideo,
} from './core/videostore';

import {
  timelineLayerStore,
  storeAddVideoToTimelineLayer,
  storeRemoveVideoFromTimelineLayer,
  storeUpdateVideoInLayer,
} from './core/timelineLayerStore';

function initializeCoreVideoIpcListeners() {
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

function initializeVideoStoreIpcListeners(mainWindow: BrowserWindow) {
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

  videoStore.onDidAnyChange((newValue: any, oldValue: any) => {
    // console.log('Store changed', oldValue, newValue);
    mainWindow.webContents.send(VIDEO_STORE_CHANGED, {
      old: oldValue,
      new: newValue,
    });
  });
}

function initializeTimelineLayerStoreIpcListeners(mainWindow: BrowserWindow) {
  ipcMain.on(STORE_ADD_VIDEO_TO_TIMELINE, async (event, arg) => {
    const {
      timelineLayerId,
      video,
      startTimeOnTimelineInSecs,
      videoStartOffsetInSecs,
      lengthInSecs,
    } = arg;

    storeAddVideoToTimelineLayer(
      timelineLayerId,
      video,
      startTimeOnTimelineInSecs,
      videoStartOffsetInSecs,
      lengthInSecs
    );
  });

  ipcMain.on(STORE_REMOVE_VIDEO_FROM_TIMELINE, async (event, arg) => {
    const { timelineLayerId, videoId } = arg;

    storeRemoveVideoFromTimelineLayer(timelineLayerId, videoId);
  });

  ipcMain.on(STORE_UPDATE_VIDEO_IN_TIMELINE, async (event, arg) => {
    const {
      timelineLayerId,
      videoId,
      startTimeOnTimelineInSecs,
      videoStartOffsetInSecs,
      lengthInSecs,
    } = arg;

    storeUpdateVideoInLayer(
      timelineLayerId,
      videoId,
      startTimeOnTimelineInSecs,
      videoStartOffsetInSecs,
      lengthInSecs
    );
  });

  ipcMain.on(STORE_GET_VIDEOS_IN_TIMELINE, async (event, arg) => {
    const { timelineLayerId } = arg;

    event.reply(
      generateMessageChannel(STORE_GET_VIDEOS_IN_TIMELINE, timelineLayerId),
      {
        storeGetVideosInTimeline(timelineLayerId)
      });
  });

  ipcMain.on(STORE_REMOVE_VIDEO_FROM_TIMELINE, async (event, arg) => {
    const { timelineLayerId, videoId } = arg;

    storeRemoveVideoFromTimelineLayer(timelineLayerId, videoId);
  });

  timelineLayerStore.onDidAnyChange((newValue: any, oldValue: any) => {
    mainWindow.webContents.send(TIMELINE_STORE_CHANGED, {
      old: oldValue,
      new: newValue,
    });
  });
}

function initializeIPCListeners(mainWindow: BrowserWindow) {
  initializeCoreVideoIpcListeners();
  initializeVideoStoreIpcListeners(mainWindow);
  initializeTimelineLayerStoreIpcListeners(mainWindow);
}

export default initializeIPCListeners;
