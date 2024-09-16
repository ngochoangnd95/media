import { app, ipcMain } from 'electron';
import { MediasApi } from './apis/medias.api';
import { MngEvent } from './constants';

export class ManagementModule {
  constructor() {
    app.whenReady().then(() => {
      const mediasApi = new MediasApi();
      ipcMain.handle(MngEvent.Medias.FindMany, (_, params) => mediasApi.findMany(params));
      ipcMain.handle(MngEvent.Medias.Create, (_, params) => mediasApi.create(params));
    });
  }
}
