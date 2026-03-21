'use strict';
export var StatusReasons;
(function (StatusReasons) {
    StatusReasons["created"] = "created";
    StatusReasons["updated"] = "updated";
    StatusReasons["deleted"] = "deleted";
    StatusReasons["modified"] = "modified";
    StatusReasons["unknown"] = "unknown";
    StatusReasons["ready"] = "ready";
})(StatusReasons || (StatusReasons = {}));
export var DownloadTypes;
(function (DownloadTypes) {
    DownloadTypes["HUGGINGFACE_DL"] = "huggingface-dl";
    DownloadTypes["WGET"] = "wget";
})(DownloadTypes || (DownloadTypes = {}));
