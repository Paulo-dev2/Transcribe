import { ViewVideoByIdController } from "../../../adapters/controllers/ViewVideoById";
import { VideoRepository } from "../../../domain/repositories/mongodb/VideoRepository";
import { MongoHelper } from "../../../domain/repositories/mongodb/helpers/mongo-helper";
import { GetVideoById } from "../../../domain/usecases/get-video-by-id/get-video-by-id";

export const makeViewVideoByIdController = (): ViewVideoByIdController => {
    const mongoHelper = MongoHelper;
    const videoRepository = new VideoRepository(mongoHelper);
    const getVideoById = new GetVideoById(videoRepository);
    const viewVideoByIdController = new ViewVideoByIdController(getVideoById);
    return viewVideoByIdController;
}