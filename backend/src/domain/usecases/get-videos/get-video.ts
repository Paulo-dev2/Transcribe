import { IGetVideos } from ".";
import { VideoRepository } from "../../repositories/mongodb/VideoRepository";
import { GetVideosResponse } from "./get-videos-response";

// Classe para recuperar todos os vídeos
export class GetVideos implements IGetVideos {
    private readonly videoRepository: VideoRepository;

    // Construtor da classe recebe instância do repositório de vídeo
    constructor(
        videoRepo: VideoRepository,
    ){
        this.videoRepository = videoRepo;
    }

    // Método para buscar todos os vídeos
    async getVideos(): Promise<GetVideosResponse>{
        // Busca todos os vídeos no repositório
        const response: any = await this.videoRepository.findAll();

        // Retorna a resposta contendo todos os vídeos encontrados
        return response;
    }
}
