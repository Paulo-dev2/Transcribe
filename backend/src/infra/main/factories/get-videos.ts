import { ViewDownloadsVideosController } from "../../../adapters/controllers/ViewDownloadsVideos";
import { VideoRepository } from "../../../domain/repositories/mongodb/VideoRepository";
import { MongoHelper } from "../../../domain/repositories/mongodb/helpers/mongo-helper";
import { GetVideos } from "../../../domain/usecases/get-videos/get-video";

export const makeViewDownloadsVideosController = (): ViewDownloadsVideosController => {
    const mongoHelper = MongoHelper;
    const videoRepository = new VideoRepository(mongoHelper);
    const getVideos = new GetVideos(videoRepository);
    const viewDownloadsVideosController = new ViewDownloadsVideosController(getVideos);
    return viewDownloadsVideosController;
}