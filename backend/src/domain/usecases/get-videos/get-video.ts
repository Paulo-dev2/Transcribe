import { IGetVideos } from ".";
import { VideoRepository } from "../../repositories/in-memory/VideoRepository";
import { GetVideosResponse } from "./get-videos-response";

export class GetVideos implements IGetVideos{
    private readonly videoRepository: VideoRepository;
    constructor(
        videoRepo: VideoRepository,
    ){
        this.videoRepository = videoRepo;
    }

    async getVideos(): Promise<GetVideosResponse>{

        const response: any = await this.videoRepository.findAll();

        return response;
    }
}