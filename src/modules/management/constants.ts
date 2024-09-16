import path from 'path';

export enum MediaType {
  Image = 'image',
  Video = 'video',
}

export const MngEvent = {
  Medias: {
    FindMany: 'findManyMedias',
    Create: 'createMedia',
  },
};

export const dbFilePath = path.resolve(__dirname, './media.db');
