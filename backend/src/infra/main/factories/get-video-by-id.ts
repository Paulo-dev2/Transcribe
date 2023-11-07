import { ViewVideoByIdController } from "../../../adapters/controllers/ViewVideoById";
import { VideoRepository } from "../../../domain/repositories/in-memory/VideoRepository";
import { GetVideoById } from "../../../domain/usecases/get-video-by-id/get-video-by-id";

export const makeViewVideoByIdController = (): ViewVideoByIdController => {
    const videoRepository = new VideoRepository();
    const getVideoById = new GetVideoById(videoRepository);
    const viewVideoByIdController = new ViewVideoByIdController(getVideoById);
    return viewVideoByIdController;
}