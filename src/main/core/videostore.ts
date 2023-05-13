import Video from 'renderer/interfaces/video';

const Store = require('electron-store');

const videoStore = new Store();
videoStore.clear();

function storeAddVideo(video: Video) {
  videoStore.set(video.id, video);
}

function storeRemoveVideo(videoId: string) {
  videoStore.delete(videoId);
}

function storeGetVideoList() {
  return videoStore.store as Video[];
}

function storeHasVideo(videoId: string) {
  return videoStore.has(videoId);
}

function clearStore() {
  videoStore.clear();
}

function storeGetCount() {
  return videoStore.size;
}

export {
  videoStore,
  storeAddVideo,
  storeRemoveVideo,
  storeGetVideoList,
  storeHasVideo,
  clearStore,
  storeGetCount,
};
