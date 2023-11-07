import { IDeleteVideoById } from ".";
import { Either, left } from "../../../shared/either";
import { InvalidIdError } from "../../entities/validations/erros/invalid-id";
import { View } from "../../entities/video/getVideo";
import { VideoRepository } from "../../repositories/in-memory/VideoRepository";
import { IdError } from "../errors/id-error";
import {DeleteVideoByIdResponse } from "./delete-video-by-id-response";

export class DeleteVideoById implements IDeleteVideoById{
    private readonly videoRepository: VideoRepository;
    constructor(
        videoRepo: VideoRepository,
    ){
        this.videoRepository = videoRepo;
    }

    async deleteVideoById(videoData: string): Promise<DeleteVideoByIdResponse>{

        const videoOrError: Either<InvalidIdError, View> = View.view(videoData);
        if(videoOrError.isLeft()) return left(videoOrError.value);
        const video: View = videoOrError.value;

        const existsId: any = await this.videoRepository.findById(video);

        if(!existsId)  return left(new IdError);

        const response: any = this.videoRepository.deleteById(video);

        return response;
    }
}