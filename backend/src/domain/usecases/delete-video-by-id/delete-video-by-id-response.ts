import { Either } from "../../../shared/either";
import { InvalidIdError } from "../../entities/validations/erros/invalid-id";
import { VideoData } from "../../entities/video/VideoData";

export type DeleteVideoByIdResponse =  Either<InvalidIdError,Array<VideoData>>