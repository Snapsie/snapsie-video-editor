import TimelineLayer from 'renderer/interfaces/timeline_layer';
import Video from 'renderer/interfaces/video';

const Store = require('electron-store');

const timelineLayerStore = new Store();
timelineLayerStore.clear();

function generateKey(timelineId: number, videoId: string) {
  return `${timelineId}-${videoId}`;
}

function storeAddVideoToTimelineLayer(
  timelineLayerId: number,
  video: Video,
  startTimeOnTimelineInSecs: number,
  videoStartOffsetInSecs: number,
  lengthInSecs: number
) {
  timelineLayerStore.set(generateKey(timelineLayerId, video.id), {
    video,
    startTimeOnTimelineInSecs,
    videoStartOffsetInSecs,
    lengthInSecs,
  });
}

function storeRemoveVideoFromTimelineLayer(
  timelineLayerId: number,
  videoId: string
) {
  timelineLayerStore.delete(generateKey(timelineLayerId, videoId));
}

function storeUpdateVideoInLayer(
  timelineLayerId: number,
  video: Video,
  startTimeOnTimelineInSecs: number,
  videoStartOffsetInSecs: number,
  lengthInSecs: number
) {
  const key = generateKey(timelineLayerId, video.id);
  const value = timelineLayerStore.get(key);
  if (value) {
    timelineLayerStore.set(key, {
      video,
      startTimeOnTimelineInSecs,
      videoStartOffsetInSecs,
      lengthInSecs,
    });
  }
}

function storeGetVideosInTimeline(timelineLayerId: number) {
  const keys = Object.keys(timelineLayerStore.store);
  const videosInTimeline = keys
    .filter((key) => key.startsWith(`${timelineLayerId}-`))
    .map((key) => timelineLayerStore.get(key));
  return videosInTimeline;
}

export {
  timelineLayerStore,
  storeAddVideoToTimelineLayer,
  storeRemoveVideoFromTimelineLayer,
  storeUpdateVideoInLayer,
  storeGetVideosInTimeline,
};
