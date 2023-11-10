import { Either } from "../../../shared/either";
import { InvalidIdError } from "../../entities/validations/erros/invalid-id";

export type UpdateVideoByIdResponse =  Either<InvalidIdError,boolean>