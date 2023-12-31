import { DownloadVideoController } from "../../../adapters/controllers/DownloadVideo";
import { VideoRepository } from "../../../domain/repositories/mongodb/VideoRepository";
import { MongoHelper } from "../../../domain/repositories/mongodb/helpers/mongo-helper";
import { DownloadVideo } from "../../../domain/usecases/download-video/download-video";
import { VideoDownloader } from "../../external/download/VideoDownloader";
import { VideoTranscriber } from "../../external/transcribe/VideoTranscribe";

export const makeDownloadVideoController = (): DownloadVideoController => {
    const mongoHelper = MongoHelper;
    const videoRepository = new VideoRepository(mongoHelper);
    const transcribeVideo = new VideoTranscriber();
    const downloaderVideo = new VideoDownloader();
    const downloadVideo = new DownloadVideo(videoRepository, transcribeVideo,downloaderVideo);
    const downloadVideoController = new DownloadVideoController(downloadVideo);
    return downloadVideoController;
}