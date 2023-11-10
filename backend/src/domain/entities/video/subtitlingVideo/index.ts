import { Either, left, right } from "../../../../shared/either";
import { VideoDataSubtitles } from "../../types/VideoData";
import { Id } from "../../validations/Id";
import { InvalidFileError } from "../../validations/erros/invalid-file";
import { InvalidIdError } from "../../validations/erros/invalid-id";
import { InvalidTranscriptError } from "../../validations/erros/invalid-transcript";
import { InvalidUrlError } from "../../validations/erros/invalid-url";
import { NameFIle } from "../../validations/nameFIle";
import { Transcript } from "../../validations/transcript";
import { Url } from "../../validations/url";

export class Subtitling{
    constructor(
        public readonly videoData: VideoDataSubtitles
    ){
        Object.freeze(this);
    }

    static subtitling(videoData: VideoDataSubtitles): Either<InvalidIdError | InvalidFileError | InvalidUrlError | InvalidTranscriptError, Subtitling>{
        const idOrError: Either<InvalidIdError, Id> = Id.create(videoData.id);

        if(idOrError.isLeft()) return left(idOrError.value);

        const transcriptOrError: Either<InvalidTranscriptError, Transcript> = Transcript.create(videoData.transcript);

        if(transcriptOrError.isLeft()) return left(transcriptOrError.value);

        const urlOrError: Either<InvalidUrlError, Url> = Url.create(videoData.videoUrl);

        if(urlOrError.isLeft()) return left(urlOrError.value)

        const fileOrError: Either<InvalidFileError, NameFIle> = NameFIle.create(videoData.videoFile);
        
        if(fileOrError.isLeft()) return left(fileOrError.value);

        return right(new Subtitling(videoData));
    }
}