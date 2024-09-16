import { contextBridge, ipcRenderer } from 'electron';
import { MngEvent } from './constants';
import { FindManyMediasData, FindManyMediasParams } from './types/medias.type';

interface ManagementApi {
  findManyMedias: (params: FindManyMediasParams) => Promise<FindManyMediasData | undefined>;
}

contextBridge.exposeInMainWorld('managementApi', {
  findManyMedias: (params) => ipcRenderer.invoke(MngEvent.Medias.FindMany, params),
} as ManagementApi);

declare global {
  interface Window {
    managementApi: ManagementApi;
  }
}

export {};
