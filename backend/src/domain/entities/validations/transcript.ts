import { Either, left, right } from '../../../shared/either';
import { InvalidTranscriptError } from './erros/invalid-transcript';

export class Transcript {
  private readonly transcript: Record<string, string>

  private constructor (transcript: Record<string, string>) {
    this.transcript = transcript
    Object.freeze(this)
  }

  static create (transcript: Record<string, string>): Either<InvalidTranscriptError, Transcript> {
    if (!Transcript.validate(transcript)) {
      return left(new InvalidTranscriptError(transcript))
    }
    return right(new Transcript(transcript))
  }

  get value (): Record<string, string> {
    return this.transcript
  }

  static validate (obj: any): obj is Record<string, string> {
        return (
            typeof obj === 'object' &&
            Object.keys(obj).every((time) => {
                const text = obj[time];
                return typeof time === 'string' && typeof text === 'string' && text.length > 0;
            })
        );
    }
}
