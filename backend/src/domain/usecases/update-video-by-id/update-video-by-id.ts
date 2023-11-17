import { IUpdateVideoById } from ".";
import { Either, left } from "../../../shared/either";
import { VideoDataUpdate } from "../../entities/types/VideoData";
import { InvalidIdError } from "../../entities/validations/erros/invalid-id";
import { InvalidTranscriptError } from "../../entities/validations/erros/invalid-transcript";
import { Update } from "../../entities/video/updateVideo";
import { VideoRepository } from "../../repositories/mongodb/VideoRepository";
import { IdError } from "../errors/id-error";
import { UpdateVideoByIdResponse } from "./update-video-by-id-response";

// Classe para atualizar informações de um vídeo
export class UpdateVideoById implements IUpdateVideoById {
    private readonly videoRepository: VideoRepository;

    // Construtor recebe uma instância do repositório de vídeo
    constructor(
        videoRepo: VideoRepository,
    ){
        this.videoRepository = videoRepo;
    }

    // Método para atualizar informações de um vídeo pelo ID
    async updateVideoById(videoData: VideoDataUpdate): Promise<UpdateVideoByIdResponse>{
        // Verifica se os dados do vídeo para atualização são válidos
        const videoOrError: Either<InvalidIdError | InvalidTranscriptError, Update> = Update.update(videoData);
        if(videoOrError.isLeft()) return left(videoOrError.value);
        const video: Update = videoOrError.value;

        // Verifica se o ID do vídeo existe
        const existsId: any = await this.videoRepository.findById(video.videoData);
        if(!existsId)  return left(new IdError);

        // Atualiza as informações do vídeo no repositório
        const response: any = this.videoRepository.updateById(video.videoData, video.videoData);

        // Retorna a resposta da operação
        return response;
    }
}
