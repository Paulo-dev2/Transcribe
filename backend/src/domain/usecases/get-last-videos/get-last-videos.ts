import { IGetLastVideos } from ".";
import { VideoRepository } from "../../repositories/mongodb/VideoRepository";
import { GetLastVideosResponse } from "./get-videos-response";

// Classe para recuperar os últimos vídeos
export class GetLastVideos implements IGetLastVideos {
    private readonly videoRepository: VideoRepository;

    // Construtor da classe recebe instância do repositório de vídeo
    constructor(
        videoRepo: VideoRepository,
    ){
        this.videoRepository = videoRepo;
    }

    // Método para obter os últimos três vídeos do repositório
    async getLastVideos(): Promise<GetLastVideosResponse>{
        // Consulta o repositório para encontrar os três vídeos mais recentes
        const response: any = await this.videoRepository.findLastThree();

        return response;
    }
}
