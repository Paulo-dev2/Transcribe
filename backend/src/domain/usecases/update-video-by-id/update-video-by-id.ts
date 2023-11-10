import { IUpdateVideoById } from ".";
import { Either, left } from "../../../shared/either";
import { VideoDataUpdate } from "../../entities/types/VideoData";
import { InvalidIdError } from "../../entities/validations/erros/invalid-id";
import { InvalidTranscriptError } from "../../entities/validations/erros/invalid-transcript";
import { Update } from "../../entities/video/updateVideo";
import { VideoRepository } from "../../repositories/mongodb/VideoRepository";
import { IdError } from "../errors/id-error";
import {UpdateVideoByIdResponse } from "./update-video-by-id-response";

export class UpdateVideoById implements IUpdateVideoById{
    private readonly videoRepository: VideoRepository;
    constructor(
        videoRepo: VideoRepository,
    ){
        this.videoRepository = videoRepo;
    }

    async updateVideoById(videoData: VideoDataUpdate): Promise<UpdateVideoByIdResponse>{

        const videoOrError: Either<InvalidIdError | InvalidTranscriptError, Update> = Update.update(videoData);
        if(videoOrError.isLeft()) return left(videoOrError.value);
        const video: Update = videoOrError.value;

        const existsId: any = await this.videoRepository.findById(video.videoData);

        if(!existsId)  return left(new IdError);

        const response: any = this.videoRepository.updateById(video.videoData, video.videoData);

        return response;
    }
}