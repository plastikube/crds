'use strict';

export enum StatusReasons {
  created = 'created',
  updated = 'updated',
  deleted = 'deleted',
  modified = 'modified',
  unknown = 'unknown',
  ready = 'ready',
}

export enum DownloadTypes {
  HUGGINGFACE_DL = 'huggingface-dl',
  WGET = 'wget',
}
