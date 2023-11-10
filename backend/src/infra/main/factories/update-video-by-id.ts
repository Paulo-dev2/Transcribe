import { UpdateVideoByIdController } from "../../../adapters/controllers/UpdateVideoById";
import { VideoRepository } from "../../../domain/repositories/mongodb/VideoRepository";
import { MongoHelper } from "../../../domain/repositories/mongodb/helpers/mongo-helper";
import { UpdateVideoById } from "../../../domain/usecases/update-video-by-id/update-video-by-id";

export const makeUpdateVideoByIdController = (): UpdateVideoByIdController => {
    const mongoHelper = MongoHelper;
    const videoRepository = new VideoRepository(mongoHelper);
    const updateVideoById = new UpdateVideoById(videoRepository);
    const updateVideoByIdController = new UpdateVideoByIdController(updateVideoById);
    return updateVideoByIdController;
}