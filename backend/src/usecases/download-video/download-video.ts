import { IDownloadVideo } from ".";
import { InvalidUrl } from "../../entities/validations/erros/invalid-url";
import { Register } from "../../entities/video/downloadVideo";
import { VideoRepository } from "../../external/repositories/VideoRepository";
import { Tanscribe } from "../../external/transcribe";
import { Either, left } from "../../shared/either";
import { DownloadVideoResponse } from "./download-video-response";

export class DownloadVideo implements IDownloadVideo{
    private readonly videoRepository: VideoRepository;
    private readonly transcribeVideo: Tanscribe;
    constructor(
        videoRepo: VideoRepository,
        transcribe: Tanscribe
    ){
        this.videoRepository = videoRepo;
        this.transcribeVideo = transcribe;
    }

    async downloadVideo(videoData: any): Promise<DownloadVideoResponse>{
        const videoOrError: Either<InvalidUrl, Register> = Register.register(videoData);
        if(videoOrError.isLeft()) return left(videoOrError.value);
        const video: Register = videoOrError.value;

        const {videoFileName, transcript} = await this.transcribeVideo.transcribe(video);
        const response: any = transcript

        //const response: any = await this.videoRepository.createTranscribe(videoFileName, transcript)

        return response;
    }
}