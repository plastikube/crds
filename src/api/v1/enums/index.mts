'use strict';

export enum StatusReasons {
  created = 'created',
  updated = 'updated',
  deleted = 'deleted',
  modified = 'modified',
  unknown = 'unknown',
  downloading = 'downloading',
  ready = 'ready',
  loading = 'loading',
  unloaded = 'unloaded',
}

export enum DownloadTypes {
  HUGGINGFACE_DL = 'huggingface-dl',
  HTTP = 'http',
  S3 = 's3',
}

export enum EngineTypes {
  LLAMACPP = 'llamacpp',
}

export const DefaultDownloaderImage: string = 'ghcr.io/plastikube/model-downloader:latest';
