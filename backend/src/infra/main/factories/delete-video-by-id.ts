import { DeleteVideoByIdController } from "../../../adapters/controllers/DeleteVideoById";
import { VideoRepository } from "../../../domain/repositories/mongodb/VideoRepository";
import { MongoHelper } from "../../../domain/repositories/mongodb/helpers/mongo-helper";
import { DeleteVideoById } from "../../../domain/usecases/delete-video-by-id/delete-video-by-id";

export const makeDeleteVideoByIdController = (): DeleteVideoByIdController => {
    const mongoHelper = MongoHelper;
    const videoRepository = new VideoRepository(mongoHelper);
    const deleteVideoById = new DeleteVideoById(videoRepository);
    const deleteVideoByIdController = new DeleteVideoByIdController(deleteVideoById);
    return deleteVideoByIdController;
}