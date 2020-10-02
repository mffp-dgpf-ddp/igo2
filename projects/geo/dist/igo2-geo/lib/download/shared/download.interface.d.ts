export interface DownloadOptions {
    url: string;
    dynamicUrl?: string;
    extern?: boolean;
}
export interface DownloadDataSourceOptions {
    download?: DownloadOptions;
}
