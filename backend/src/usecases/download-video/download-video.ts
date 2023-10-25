import { IDownloadVideo } from ".";
import { InvalidUrl } from "../../entities/validations/erros/invalid-url";
import { Register } from "../../entities/video/downloadVideo";
import { VideoDownloader } from "../../external/download/VideoDownloader";
import { VideoRepository } from "../../external/repositories/VideoRepository";
import { VideoTranscriber } from "../../external/transcribe/VideoTranscribe";
import { Either, left } from "../../shared/either";
import { DownloadVideoResponse } from "./download-video-response";

export class DownloadVideo implements IDownloadVideo{
    private readonly videoRepository: VideoRepository;
    private readonly transcribeVideo: VideoTranscriber;
    private readonly downloaderVideo: VideoDownloader;
    constructor(
        videoRepo: VideoRepository,
        transcribe: VideoTranscriber,
        download: VideoDownloader
    ){
        this.videoRepository = videoRepo;
        this.transcribeVideo = transcribe;
        this.downloaderVideo = download;
    }

    async downloadVideo(videoData: any): Promise<DownloadVideoResponse>{
        const videoOrError: Either<InvalidUrl, Register> = Register.register(videoData);
        if(videoOrError.isLeft()) return left(videoOrError.value);
        const video: Register = videoOrError.value;

        const videoFileName = await this.downloaderVideo.download(video)
        const transcript = await this.transcribeVideo.transcribe(videoFileName);
        const response: any = transcript

        //const response: any = await this.videoRepository.createTranscribe(videoFileName, transcript)

        return response;
    }
}