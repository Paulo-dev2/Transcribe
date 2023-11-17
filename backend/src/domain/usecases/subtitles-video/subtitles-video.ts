import { ISubititlesVideo } from ".";
import { VideoDownloadeMp4 } from "../../../infra/external/download-mp4/VideoDownloaderMp4";
import { Either, left } from "../../../shared/either";
import { VideoDataSubtitles } from "../../entities/types/VideoData";
import { InvalidIdError } from "../../entities/validations/erros/invalid-id";
import { InvalidUrlError } from "../../entities/validations/erros/invalid-url";
import { Subtitling } from "../../entities/video/subtitlingVideo";
import { VideoRepository } from "../../repositories/mongodb/VideoRepository";
import { IdError } from "../errors/id-error";
import { SubititlesVideoResponse } from "./subtitles-video-response";

// Classe para adicionar legendas a um vídeo
export class SubititlesVideo implements ISubititlesVideo {
    private readonly videoRepository: VideoRepository;
    private readonly downloadVideoMp4: VideoDownloadeMp4
    // Construtor recebe instâncias do repositório de vídeo e do downloader de vídeo MP4
    constructor(
        videoRepo: VideoRepository,
        downloadVideoMp4: VideoDownloadeMp4
    ) {
        this.videoRepository = videoRepo;
        this.downloadVideoMp4 = downloadVideoMp4;
    }

    // Método para adicionar legendas a um vídeo
    async subititlesVideo(videoData: VideoDataSubtitles): Promise<SubititlesVideoResponse> {
        let response: any;

        // Verifica se os dados do vídeo e das legendas são válidos
        const videoOrError: Either<InvalidUrlError | InvalidIdError, Subtitling> = Subtitling.subtitling(videoData);
        if (videoOrError.isLeft()) return left(videoOrError.value);
        const video: Subtitling = videoOrError.value;

        // Verifica se o ID do vídeo existe
        const idIsExist = this.videoRepository.findById(video.videoData)
        if (!idIsExist) return left(new IdError)

        // Verifica se o vídeo já passou pela a legendagem
        const existsSubtitles = await this.videoRepository.findByIdForSubtitles(video.videoData);

        // Se o vídeo possui legendas, só retorna true
        if (existsSubtitles !== null) {
            response = true
        } else { // Caso contrário, baixa o vídeo em mp4
            const videoMp4: any = await this.downloadVideoMp4.download(video.videoData.videoUrl, video.videoData.id)

            // Atualiza o arquivo do vídeo no repositório com os arquivos
            response = this.videoRepository.updateByIdFile(video.videoData, videoMp4.fileName, videoMp4.filePath)
        }

        // Retorna a resposta da operação
        return response;
    }
}