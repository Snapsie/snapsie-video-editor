// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import {
  EXTRACT_VIDEO_NON_BLACK_THUMBNAIL,
  EXTRACT_VIDEO_THUMBNAILS,
} from 'consts';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const electronHandler = {
  IPCRenderer: {
    sendMessage(channel: string, args: {}) {
      ipcRenderer.send(channel, args);
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
