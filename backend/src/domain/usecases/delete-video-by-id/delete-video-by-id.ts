import { IDeleteVideoById } from ".";
import { Either, left } from "../../../shared/either";
import { InvalidIdError } from "../../entities/validations/erros/invalid-id";
import { View } from "../../entities/video/getVideo";
import { VideoRepository } from "../../repositories/mongodb/VideoRepository";
import { IdError } from "../errors/id-error";
import { DeleteVideoByIdResponse } from "./delete-video-by-id-response";

// Classe para a lógica de exclusão de vídeo por ID
export class DeleteVideoById implements IDeleteVideoById {
    private readonly videoRepository: VideoRepository;

    // Construtor da classe recebe um repositório de vídeo
    constructor(
        videoRepo: VideoRepository,
    ){
        this.videoRepository = videoRepo;
    }

    // Método para deletar vídeo por ID
    async deleteVideoById(videoData: string): Promise<DeleteVideoByIdResponse>{
        let response: any;

        // Verifica se o vídeo tem um formato válido antes de prosseguir
        const videoOrError: Either<InvalidIdError, View> = View.view(videoData);
        if(videoOrError.isLeft()) return left(videoOrError.value);
        const video: View = videoOrError.value;

        // Verifica se o vídeo existe pelo ID
        const existsId: any = await this.videoRepository.findById(video);

        // Se o vídeo não existe, retorna um erro de ID inválido
        if(!existsId)  return left(new IdError);

        // Verifica se o vídeo possui legendas
        const existsSubtitles = await this.videoRepository.findByIdForSubtitles(video);

        // Se o vídeo possui legendas, executa a exclusão com legendas, apagando o mp4
        if (existsSubtitles !== null) {
            let objectVideo = { id: video.id, videoFile: existsSubtitles.videoFile };
            response = await this.videoRepository.deleteByIdForSubtitles(objectVideo);
            response = true
        } else { // Caso contrário, executa a exclusão normal
            response = await this.videoRepository.deleteById(video);
            response = true
        }

        return response;
    }
}
