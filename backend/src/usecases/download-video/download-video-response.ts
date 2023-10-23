import { Either } from "../../shared/either";
import { InvalidUrl } from "../../entities/validations/erros/invalid-url";
import { VideoData } from "../../entities/video/VideoData";

export type DownloadVideoResponse = Either<InvalidUrl, any>