import { app, ipcMain } from 'electron';
import { saveToFile, saveToFolder } from './apis/common.api';
import { CommonEvent } from './constants';

export class CommonModule {
  constructor() {
    app.whenReady().then(() => {
      ipcMain.handle(CommonEvent.SaveToFile, (_, params) => saveToFile(params));
      ipcMain.handle(CommonEvent.SaveToFolder, (_, params) => saveToFolder(params));
    });
  }
}
