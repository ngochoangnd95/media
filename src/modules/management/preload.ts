import { contextBridge, ipcRenderer } from 'electron';
import { MngEvent } from './constants';
import {
  CreateMediaData,
  CreateMediaParams,
  FindManyMediasData,
  FindManyMediasParams,
} from './types/medias.type';

interface ManagementApi {
  findManyMedias: (params: FindManyMediasParams) => Promise<FindManyMediasData | undefined>;
  createMedia: (params: CreateMediaParams) => Promise<CreateMediaData | undefined>;
}

contextBridge.exposeInMainWorld('managementApi', {
  findManyMedias: (params) => ipcRenderer.invoke(MngEvent.Medias.FindMany, params),
  createMedia: (params) => ipcRenderer.invoke(MngEvent.Medias.Create, params),
} as ManagementApi);

declare global {
  interface Window {
    managementApi: ManagementApi;
  }
}

export {};
