import { IDownloadVideo } from ".";
import { InvalidUrlError } from "../../../domain/entities/validations/erros/invalid-url";
import { Register } from "../../../domain/entities/video/downloadVideo";
import { VideoDownloader } from "../../../infra/external/download/VideoDownloader";
import { VideoRepository } from "../../repositories/mongodb/VideoRepository";
import { VideoTranscriber } from "../../../infra/external/transcribe/VideoTranscribe";
import { Either, left } from "../../../shared/either";
import { DownloadVideoResponse } from "./download-video-response";

// Classe para a lógica de download de vídeo
export class DownloadVideo implements IDownloadVideo {
    private readonly videoRepository: VideoRepository;
    private readonly transcribeVideo: VideoTranscriber;
    private readonly downloaderVideo: VideoDownloader;

    // Construtor da classe recebe instâncias dos repositórios e ferramentas necessárias
    constructor(
        videoRepo: VideoRepository,
        transcribe: VideoTranscriber,
        download: VideoDownloader
    ){
        this.videoRepository = videoRepo;
        this.transcribeVideo = transcribe;
        this.downloaderVideo = download;
    }

    // Método para realizar o download de um vídeo
    async downloadVideo(videoData: any): Promise<DownloadVideoResponse>{
        // Verifica se o URL do vídeo é válido antes de prosseguir
        const videoOrError: Either<InvalidUrlError, Register> = Register.register(videoData);
        if(videoOrError.isLeft()) return left(videoOrError.value);
        const video: Register = videoOrError.value;

        // Verifica se o vídeo já existe no repositório por URL
        const existsUrl: any = await this.videoRepository.findByUrl(video)
        
        // Se o vídeo já existe, retorna o resultado existente
        if(existsUrl) return existsUrl
        
        // Baixa o vídeo e o transcreve para gerar o arquivo de legenda
        const videoObj: any = await this.downloaderVideo.download(video)
        const {transcript, videoFile}: any = await this.transcribeVideo.transcribe(videoObj.file);

        // Cria um novo registro de vídeo no repositório
        const response: any = await this.videoRepository.create(video, transcript, videoFile, videoObj);

        return response;
    }
}
