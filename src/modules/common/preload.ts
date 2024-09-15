import { contextBridge, ipcRenderer } from 'electron';
import { CommonEvent } from './constants';

interface CommonApi {
  saveToFile: (params: any) => Promise<string>;
  saveToFolder: (params: any) => Promise<string>;
}

contextBridge.exposeInMainWorld('commonApi', {
  saveToFile: (params) => ipcRenderer.invoke(CommonEvent.SaveToFile, params),
  saveToFolder: (params) => ipcRenderer.invoke(CommonEvent.SaveToFolder, params),
} as CommonApi);

declare global {
  interface Window {
    commonApi: CommonApi;
  }
}

export {};
