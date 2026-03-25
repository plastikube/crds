'use strict';
export var StatusReasons;
(function (StatusReasons) {
    StatusReasons["created"] = "created";
    StatusReasons["updated"] = "updated";
    StatusReasons["deleted"] = "deleted";
    StatusReasons["modified"] = "modified";
    StatusReasons["unknown"] = "unknown";
    StatusReasons["downloading"] = "downloading";
    StatusReasons["ready"] = "ready";
    StatusReasons["loading"] = "loading";
    StatusReasons["unloaded"] = "unloaded";
})(StatusReasons || (StatusReasons = {}));
export var DownloadTypes;
(function (DownloadTypes) {
    DownloadTypes["HUGGINGFACE_DL"] = "huggingface-dl";
    DownloadTypes["HTTP"] = "http";
    DownloadTypes["S3"] = "s3";
})(DownloadTypes || (DownloadTypes = {}));
export var EngineTypes;
(function (EngineTypes) {
    EngineTypes["LLAMACPP"] = "llamacpp";
})(EngineTypes || (EngineTypes = {}));
export const DefaultDownloaderImage = 'ghcr.io/plastikube/model-downloader:latest';
