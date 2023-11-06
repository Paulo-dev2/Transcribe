import { ViewDownloadsVideosController } from "../../../adapters/controllers/ViewDownloadsVideos";
import { VideoRepository } from "../../../domain/repositories/in-memory/VideoRepository";
import { GetVideos } from "../../../domain/usecases/get-videos/get-video";

export const makeViewDownloadsVideosController = (): ViewDownloadsVideosController => {
    const videoRepository = new VideoRepository();
    const getVideos = new GetVideos(videoRepository);
    const viewDownloadsVideosController = new ViewDownloadsVideosController(getVideos);
    return viewDownloadsVideosController;
}