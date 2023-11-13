import { ISubititlesVideo} from ".";
import { VideoDownloadeMp4 } from "../../../infra/external/download-mp4/VideoDownloaderMp4";
import { Either, left } from "../../../shared/either";
import { VideoDataSubtitles } from "../../entities/types/VideoData";
import { InvalidIdError } from "../../entities/validations/erros/invalid-id";
import { InvalidUrlError } from "../../entities/validations/erros/invalid-url";
import { Subtitling } from "../../entities/video/subtitlingVideo";
import { VideoRepository } from "../../repositories/mongodb/VideoRepository";
import { IdError } from "../errors/id-error";
import { SubititlesVideoResponse } from "./subtitles-video-response";

export class SubititlesVideo implements ISubititlesVideo{
    private readonly videoRepository: VideoRepository;
    private readonly downloadVideoMp4: VideoDownloadeMp4
    constructor(
        videoRepo: VideoRepository,
        downloadVideoMp4: VideoDownloadeMp4
    ){
        this.videoRepository = videoRepo;
        this.downloadVideoMp4 = downloadVideoMp4;
    }

    async subititlesVideo(videoData: VideoDataSubtitles): Promise<SubititlesVideoResponse>{
        const videoOrError: Either<InvalidUrlError | InvalidIdError, Subtitling> = Subtitling.subtitling(videoData);
        if(videoOrError.isLeft()) return left(videoOrError.value);
        const video: Subtitling = videoOrError.value;

        const idIsExist = this.videoRepository.findById(video.videoData)
        if(!idIsExist) return left( new IdError)

        const videoMp4: any = await this.downloadVideoMp4.download(video.videoData.videoUrl,video.videoData.id)

        const response: any = this.videoRepository.updateByIdFile(video.videoData, videoMp4.fileName)

        return response;
    }
}