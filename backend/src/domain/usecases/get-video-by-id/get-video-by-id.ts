import { IGetVideoById } from ".";
import { Either, left } from "../../../shared/either";
import { InvalidIdError } from "../../entities/validations/erros/invalid-id";
import { View } from "../../entities/video/getVideo";
import { VideoRepository } from "../../repositories/mongodb/VideoRepository";
import { IdError } from "../errors/id-error";
import { GetVideoByIdResponse } from "./get-video-by-id-response";

// Classe para recuperar um vídeo por ID
export class GetVideoById implements IGetVideoById {
    private readonly videoRepository: VideoRepository;

    // Construtor da classe recebe instância do repositório de vídeo
    constructor(
        videoRepo: VideoRepository,
    ){
        this.videoRepository = videoRepo;
    }

    // Método para buscar um vídeo por ID
    async getVideoById(videoData: string): Promise<GetVideoByIdResponse>{
        // Converte os dados do vídeo para o formato apropriado
        const videoOrError: Either<InvalidIdError, View> = View.view(videoData);

        // Verifica se houve um erro ao converter os dados do vídeo
        if(videoOrError.isLeft()) return left(videoOrError.value);
        
        // Extrai o vídeo do valor Either
        const video: View = videoOrError.value;

        // Verifica se o ID do vídeo existe no repositório
        const existsId: any = await this.videoRepository.findById(video);

        // Retorna o vídeo se ele existir
        if(existsId) return existsId;

        // Retorna um erro se o vídeo não for encontrado
        return left(new IdError);
    }
}
