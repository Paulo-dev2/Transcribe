import { IGetLastVideos } from ".";
import { VideoRepository } from "../../repositories/mongodb/VideoRepository";
import { GetLastVideosResponse } from "./get-videos-response";

export class GetLastVideos implements IGetLastVideos{
    private readonly videoRepository: VideoRepository;
    constructor(
        videoRepo: VideoRepository,
    ){
        this.videoRepository = videoRepo;
    }

    async getLastVideos(): Promise<GetLastVideosResponse>{

        const response: any = await this.videoRepository.findLastThree();

        return response;
    }
}