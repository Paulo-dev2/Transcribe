import { Either } from "../../../shared/either";
import { InvalidFileError } from "../../entities/validations/erros/invalid-file";
import { InvalidIdError } from "../../entities/validations/erros/invalid-id";
import { InvalidTranscriptError } from "../../entities/validations/erros/invalid-transcript";
import { InvalidUrlError } from "../../entities/validations/erros/invalid-url";

export type SubititlesVideoResponse =  Either<InvalidIdError | InvalidTranscriptError | InvalidUrlError | InvalidFileError, boolean>