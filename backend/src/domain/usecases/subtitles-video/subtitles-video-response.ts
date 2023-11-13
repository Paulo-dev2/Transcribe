import { Either } from "../../../shared/either";
import { InvalidIdError } from "../../entities/validations/erros/invalid-id";
import { InvalidUrlError } from "../../entities/validations/erros/invalid-url";

export type SubititlesVideoResponse =  Either<InvalidIdError  | InvalidUrlError , any>