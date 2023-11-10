import { DomainError } from "./domain-error";

export class InvalidTranscriptError extends Error implements DomainError{
    constructor(transcript: string){
        super(`this transcript ${transcript} is invalid`);
        this.name = 'InvalidTranscriptError'
    }
}