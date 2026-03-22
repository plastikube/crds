'use strict';

export enum StatusReasons {
  created = 'created',
  updated = 'updated',
  deleted = 'deleted',
  modified = 'modified',
  unknown = 'unknown',
  downloading = 'downloading',
  ready = 'ready',
}

export enum DownloadTypes {
  HUGGINGFACE_DL = 'huggingface-dl',
  HTTP = 'http',
  S3 = 's3',
}
