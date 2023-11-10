import { IDownloadVideo } from ".";
import { InvalidUrlError } from "../../../domain/entities/validations/erros/invalid-url";
import { Register } from "../../../domain/entities/video/downloadVideo";
import { VideoDownloader } from "../../../infra/external/download/VideoDownloader";
import { VideoRepository } from "../../repositories/mongodb/VideoRepository";
import { VideoTranscriber } from "../../../infra/external/transcribe/VideoTranscribe";
import { Either, left } from "../../../shared/either";
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
        const videoOrError: Either<InvalidUrlError, Register> = Register.register(videoData);
        if(videoOrError.isLeft()) return left(videoOrError.value);
        const video: Register = videoOrError.value;

        const existsUrl: any = await this.videoRepository.findByUrl(video)

        if(existsUrl) return existsUrl
        
        const videoObj: any = await this.downloaderVideo.download(video)
        const {transcript, videoFile}: any = await this.transcribeVideo.transcribe(videoObj.file);

        const response: any = await this.videoRepository.create(video, transcript, videoFile, videoObj);

        return response;
    }
}