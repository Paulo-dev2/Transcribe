import { ViewDownloadsLastVideosController } from "../../../adapters/controllers/ViewDownloadsLastVideos";
import { ViewDownloadsVideosController } from "../../../adapters/controllers/ViewDownloadsVideos";
import { VideoRepository } from "../../../domain/repositories/mongodb/VideoRepository";
import { MongoHelper } from "../../../domain/repositories/mongodb/helpers/mongo-helper";
import { GetLastVideos } from "../../../domain/usecases/get-last-videos/get-last-videos";

export const makeViewDownloadsLastVideosController = (): ViewDownloadsLastVideosController => {
    const mongoHelper = MongoHelper;
    const videoRepository = new VideoRepository(mongoHelper);
    const getLastVideos = new GetLastVideos(videoRepository);
    const viewDownloadsVideosController = new ViewDownloadsLastVideosController(getLastVideos);
    return viewDownloadsVideosController;
}