import { app, BrowserWindow, ipcMain } from 'electron';
import { EventEmitter } from 'events';
import { VideoEditorApi } from './apis/video-editor.api';
import { FfmpegEvent, ProcessEvent } from './constants';

export class VideoEditorModule {
  emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
    const api = new VideoEditorApi(this.emitter);

    app.whenReady().then(() => {
      ipcMain.on(FfmpegEvent.Edit, (_, params) => api.edit(params));
      ipcMain.on(FfmpegEvent.Merge, (_, params) => api.merge(params));
      ipcMain.on(FfmpegEvent.TakeScreenshot, (_, params) => api.takeScreenshot(params));
      ipcMain.on(FfmpegEvent.TrimBlankBorder, (_, params) => api.trimBlankBorder(params));
    });
  }

  attachToWindow(window: BrowserWindow) {
    this.emitter.on(ProcessEvent.Start, (...args) => {
      window.webContents.send(ProcessEvent.Start, ...args);
    });
    this.emitter.on(ProcessEvent.End, (...args) => {
      window.webContents.send(ProcessEvent.End, ...args);
    });
    this.emitter.on(ProcessEvent.Error, (...args) => {
      window.webContents.send(ProcessEvent.Error, ...args);
    });
  }
}
