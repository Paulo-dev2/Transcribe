import { SubtitlesVideoByIdController } from "../../../adapters/controllers/SubtitlesVideo";
import { VideoRepository } from "../../../domain/repositories/mongodb/VideoRepository";
import { MongoHelper } from "../../../domain/repositories/mongodb/helpers/mongo-helper";
import { SubititlesVideo } from "../../../domain/usecases/subtitles-video/subtitles-video";
import { VideoDownloadeMp4 } from "../../external/download-mp4/VideoDownloaderMp4";

export const makeSubtitlesVideoController = (): SubtitlesVideoByIdController => {
    const mongoHelper = MongoHelper;
    const videoRepository = new VideoRepository(mongoHelper);
    const downloadVideoMp4 = new VideoDownloadeMp4()
    const subititlesVideo = new SubititlesVideo(videoRepository, downloadVideoMp4);
    const subtitlesVideoByIdController = new SubtitlesVideoByIdController(subititlesVideo);
    return subtitlesVideoByIdController;
}