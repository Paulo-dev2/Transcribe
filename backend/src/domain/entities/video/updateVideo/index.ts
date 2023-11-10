import { Either, left, right } from "../../../../shared/either";
import { VideoDataUpdate } from "../../types/VideoData";
import { Id } from "../../validations/Id";
import { InvalidIdError } from "../../validations/erros/invalid-id";
import { InvalidTranscriptError } from "../../validations/erros/invalid-transcript";
import { Transcript } from "../../validations/transcript";

export class Update{
    constructor(
        public readonly videoData: VideoDataUpdate
    ){
        Object.freeze(this);
    }

    static update(videoData: VideoDataUpdate): Either<InvalidIdError, Update>{
        const idOrError: Either<InvalidIdError, Id> = Id.create(videoData.id);

        if(idOrError.isLeft()) return left(idOrError.value);

        const transcriptOrError: Either<InvalidTranscriptError, Transcript> = Transcript.create(videoData.transcript);

        if(transcriptOrError.isLeft()) return left(transcriptOrError.value);

        return right(new Update(videoData));
    }
}