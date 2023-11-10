import { ISubititlesVideo} from ".";
import { ConvertToSrt } from "../../../infra/external/SRT/ConvertToSrt";
import { VideoDownloadeMp4 } from "../../../infra/external/download-mp4/VideoDownloaderMp4";
import { DownloadVideoWithSubtitles } from "../../../infra/external/subtitles/DownloadVideoWithSubtitles";
import { Either, left } from "../../../shared/either";
import { VideoDataSubtitles } from "../../entities/types/VideoData";
import { InvalidFileError } from "../../entities/validations/erros/invalid-file";
import { InvalidIdError } from "../../entities/validations/erros/invalid-id";
import { InvalidTranscriptError } from "../../entities/validations/erros/invalid-transcript";
import { InvalidUrlError } from "../../entities/validations/erros/invalid-url";
import { Subtitling } from "../../entities/video/subtitlingVideo";
import { VideoRepository } from "../../repositories/mongodb/VideoRepository";
import { IdError } from "../errors/id-error";
import { SubititlesVideoResponse } from "./subtitles-video-response";

export class SubititlesVideo implements ISubititlesVideo{
    private readonly videoRepository: VideoRepository;
    private readonly convertSrt: ConvertToSrt;
    private readonly downloadVideoWithSubtitles: DownloadVideoWithSubtitles
    private readonly downloadVideoMp4: VideoDownloadeMp4
    constructor(
        videoRepo: VideoRepository,
        convertSrt: ConvertToSrt,
        downloadVideoWithSubtitles: DownloadVideoWithSubtitles,
        downloadVideoMp4: VideoDownloadeMp4
    ){
        this.videoRepository = videoRepo;
        this.convertSrt = convertSrt;
        this.downloadVideoWithSubtitles = downloadVideoWithSubtitles
        this.downloadVideoMp4 = downloadVideoMp4;
    }

    async subititlesVideo(videoData: VideoDataSubtitles): Promise<SubititlesVideoResponse>{
        const videoOrError: Either<InvalidUrlError | InvalidIdError | InvalidTranscriptError | InvalidFileError, Subtitling> = Subtitling.subtitling(videoData);
        if(videoOrError.isLeft()) return left(videoOrError.value);
        const video: Subtitling = videoOrError.value;

        const idIsExist = this.videoRepository.findById(video.videoData)
        if(!idIsExist) return left( new IdError)

        const fileSrt: any = await this.convertSrt.convert(video.videoData.transcript);
        const videoMp4: any = await this.downloadVideoMp4.download(video.videoData.videoUrl,video.videoData.id)
        const videoWithSubtitles = await this.downloadVideoWithSubtitles.subtitles(video.videoData.videoFile, fileSrt, videoMp4.filePath);

        const response: any = this.videoRepository.updateByIdFile(video.videoData, videoWithSubtitles)

        return response;
    }
}