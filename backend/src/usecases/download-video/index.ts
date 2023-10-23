import { DownloadVideoResponse } from "./download-video-response";

export interface IDownloadVideo{
    downloadVideo: (video: any) => Promise<DownloadVideoResponse>
}