import { IGetVideoById } from ".";
import { Either, left } from "../../../shared/either";
import { InvalidIdError } from "../../entities/validations/erros/invalid-id";
import { View } from "../../entities/video/getVideo";
import { VideoRepository } from "../../repositories/mongodb/VideoRepository";
import { IdError } from "../errors/id-error";
import { GetVideoByIdResponse } from "./get-video-by-id-response";

export class GetVideoById implements IGetVideoById{
    private readonly videoRepository: VideoRepository;
    constructor(
        videoRepo: VideoRepository,
    ){
        this.videoRepository = videoRepo;
    }

    async getVideoById(videoData: string): Promise<GetVideoByIdResponse>{

        const videoOrError: Either<InvalidIdError, View> = View.view(videoData);
        if(videoOrError.isLeft()) return left(videoOrError.value);
        const video: View = videoOrError.value;

        const existsId: any = await this.videoRepository.findById(video);

        if(existsId) return existsId

        return left(new IdError);
    }
}