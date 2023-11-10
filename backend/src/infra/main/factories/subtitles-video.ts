import { SubtitlesVideoByIdController } from "../../../adapters/controllers/SubtitlesVideo";
import { VideoRepository } from "../../../domain/repositories/mongodb/VideoRepository";
import { MongoHelper } from "../../../domain/repositories/mongodb/helpers/mongo-helper";
import { SubititlesVideo } from "../../../domain/usecases/subtitles-video/subtitles-video";
import { ConvertToSrt } from "../../external/SRT/ConvertToSrt";
import { VideoDownloadeMp4 } from "../../external/download-mp4/VideoDownloaderMp4";
import { Encoder } from "../../external/encoder";
import { DownloadVideoWithSubtitles } from "../../external/subtitles/DownloadVideoWithSubtitles";

export const makeSubtitlesVideoController = (): SubtitlesVideoByIdController => {
    const mongoHelper = MongoHelper;
    const videoRepository = new VideoRepository(mongoHelper);
    const encoder = new Encoder();
    const convertSrt = new ConvertToSrt(encoder)
    const videoWithSubtitles = new DownloadVideoWithSubtitles();
    const downloadVideoMp4 = new VideoDownloadeMp4()
    const subititlesVideo = new SubititlesVideo(videoRepository, convertSrt, videoWithSubtitles, downloadVideoMp4);
    const subtitlesVideoByIdController = new SubtitlesVideoByIdController(subititlesVideo);
    return subtitlesVideoByIdController;
}