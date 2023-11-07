import { DeleteVideoByIdController } from "../../../adapters/controllers/DeleteVideoById";
import { VideoRepository } from "../../../domain/repositories/in-memory/VideoRepository";
import { DeleteVideoById } from "../../../domain/usecases/delete-video-by-id/delete-video-by-id";

export const makeDeleteVideoByIdController = (): DeleteVideoByIdController => {
    const videoRepository = new VideoRepository();
    const deleteVideoById = new DeleteVideoById(videoRepository);
    const deleteVideoByIdController = new DeleteVideoByIdController(deleteVideoById);
    return deleteVideoByIdController;
}