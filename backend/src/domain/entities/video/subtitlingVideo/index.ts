import { Either, left, right } from "../../../../shared/either";
import { VideoDataSubtitles } from "../../types/VideoData";
import { Id } from "../../validations/Id";
import { InvalidIdError } from "../../validations/erros/invalid-id";
import { InvalidUrlError } from "../../validations/erros/invalid-url";
import { Url } from "../../validations/url";

export class Subtitling{
    constructor(
        public readonly videoData: VideoDataSubtitles
    ){
        Object.freeze(this);
    }

    static subtitling(videoData: VideoDataSubtitles): Either<InvalidIdError  | InvalidUrlError , Subtitling>{
        const idOrError: Either<InvalidIdError, Id> = Id.create(videoData.id);

        if(idOrError.isLeft()) return left(idOrError.value);

        const urlOrError: Either<InvalidUrlError, Url> = Url.create(videoData.videoUrl);

        if(urlOrError.isLeft()) return left(urlOrError.value)

        return right(new Subtitling(videoData));
    }
}