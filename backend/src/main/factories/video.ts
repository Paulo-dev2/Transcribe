import { VideoRepository } from "../../external/repositories/VideoRepository";
import { Tanscribe } from "../../external/transcribe";
import { DownloadVideoController } from "../../presentations/controllers/DownloadVideo";
import { DownloadVideo } from "../../usecases/download-video/download-video";

export const makeDownloadVideoController = (): DownloadVideoController => {
    const videoRepository = new VideoRepository();
    const transcribeVideo = new Tanscribe();
    const downloadVideo = new DownloadVideo(videoRepository, transcribeVideo);
    const downloadVideoController = new DownloadVideoController(downloadVideo);
    return downloadVideoController;
}