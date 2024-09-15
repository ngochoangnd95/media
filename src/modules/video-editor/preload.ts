import { contextBridge, ipcRenderer } from 'electron';
import { FfmpegEvent, ProcessEvent } from './constants';
import {
  EditParams,
  Listener,
  MergeParams,
  TakeScreenshotParams,
  TrimBlankBorderParams,
} from './types/video-editor.type';

interface VideoEditorApi {
  edit: (params: EditParams) => void;
  merge: (params: MergeParams) => void;
  takeScreenshot: (params: TakeScreenshotParams) => void;
  trimBlankBorder: (params: TrimBlankBorderParams) => void;

  on: (name: ProcessEvent, listener: Listener) => void;
  off: (name: ProcessEvent, listener: Listener) => void;
}

contextBridge.exposeInMainWorld('videoEditorApi', {
  edit: (params) => ipcRenderer.send(FfmpegEvent.Edit, params),
  merge: (params) => ipcRenderer.send(FfmpegEvent.Merge, params),
  takeScreenshot: (params) => ipcRenderer.send(FfmpegEvent.TakeScreenshot, params),
  trimBlankBorder: (params) => ipcRenderer.send(FfmpegEvent.TrimBlankBorder, params),

  on: (name, listener) => ipcRenderer.on(name, listener),
  off: (name, listener) => ipcRenderer.off(name, listener),
} as VideoEditorApi);

declare global {
  interface Window {
    videoEditorApi: VideoEditorApi;
  }
}

export {};
