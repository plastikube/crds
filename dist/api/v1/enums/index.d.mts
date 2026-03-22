export declare enum StatusReasons {
    created = "created",
    updated = "updated",
    deleted = "deleted",
    modified = "modified",
    unknown = "unknown",
    downloading = "downloading",
    ready = "ready"
}
export declare enum DownloadTypes {
    HUGGINGFACE_DL = "huggingface-dl",
    HTTP = "http",
    S3 = "s3"
}
export declare enum EngineTypes {
    LLAMACPP = "llamacpp"
}
export declare const DefaultDownloaderImage: string;
