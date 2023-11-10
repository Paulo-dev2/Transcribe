import { DomainError } from "./domain-error";

export class InvalidFileError extends Error implements DomainError{
    constructor(file: string){
        super(`this file ${file} isinvalid`);
        this.name = 'InvalidFileError'
    }
}