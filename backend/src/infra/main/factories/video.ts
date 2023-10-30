import { DownloadVideoController } from "../../../adapters/controllers/DownloadVideo";
import { VideoRepository } from "../../../domain/repositories/in-memory/VideoRepository";
import { DownloadVideo } from "../../../domain/usecases/download-video/download-video";
import { VideoDownloader } from "../../download/VideoDownloader";
import { VideoTranscriber } from "../../transcribe/VideoTranscribe";

export const makeDownloadVideoController = (): DownloadVideoController => {
    const videoRepository = new VideoRepository();
    const transcribeVideo = new VideoTranscriber();
    const downloaderVideo = new VideoDownloader();
    const downloadVideo = new DownloadVideo(videoRepository, transcribeVideo,downloaderVideo);
    const downloadVideoController = new DownloadVideoController(downloadVideo);
    return downloadVideoController;
}