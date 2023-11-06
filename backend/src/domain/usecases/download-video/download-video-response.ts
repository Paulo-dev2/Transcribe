import { Either } from "../../../shared/either";
import { InvalidUrl } from "../../../domain/entities/validations/erros/invalid-url";
import { VideoData } from "../../../domain/entities/video/VideoData";

export type DownloadVideoResponse = Either<InvalidUrl, VideoData>