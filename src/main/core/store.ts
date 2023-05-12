import Video from 'renderer/interfaces/video';

const Store = require('electron-store');

const store = new Store();
store.clear();

function storeAddVideo(video: Video) {
  console.log(video);
  store.set(video.id, video);
}

function storeRemoveVideo(videoId: string) {
  store.delete(videoId);
}

function storeGetVideoList() {
  return store.store as Video[];
}

function storeHasVideo(videoId: string) {
  return store.has(videoId);
}

function clearStore() {
  store.clear();
}

function storeGetCount() {
  return store.size;
}

export {
  store,
  storeAddVideo,
  storeRemoveVideo,
  storeGetVideoList,
  storeHasVideo,
  clearStore,
  storeGetCount,
};
