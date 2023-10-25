import { VideoDownloader } from "../../external/download/VideoDownloader";
import { VideoRepository } from "../../external/repositories/VideoRepository";
import { VideoTranscriber } from "../../external/transcribe/VideoTranscribe";
import { DownloadVideoController } from "../../presentations/controllers/DownloadVideo";
import { DownloadVideo } from "../../usecases/download-video/download-video";

export const makeDownloadVideoController = (): DownloadVideoController => {
    const videoRepository = new VideoRepository();
    const transcribeVideo = new VideoTranscriber();
    const downloaderVideo = new VideoDownloader();
    const downloadVideo = new DownloadVideo(videoRepository, transcribeVideo,downloaderVideo);
    const downloadVideoController = new DownloadVideoController(downloadVideo);
    return downloadVideoController;
}