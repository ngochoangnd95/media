import { contextBridge, ipcRenderer, webUtils } from 'electron';
import { CommonEvent } from './constants';

interface CommonApi {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveToFile: (params: any) => Promise<string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveToFolder: (params: any) => Promise<string>;
  showFilePath: (file: File) => string;
}

contextBridge.exposeInMainWorld('commonApi', {
  saveToFile: (params) => ipcRenderer.invoke(CommonEvent.SaveToFile, params),
  saveToFolder: (params) => ipcRenderer.invoke(CommonEvent.SaveToFolder, params),
  showFilePath: (file) => webUtils.getPathForFile(file),
} as CommonApi);

declare global {
  interface Window {
    commonApi: CommonApi;
  }
}

export {};
