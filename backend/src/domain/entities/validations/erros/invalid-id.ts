import { DomainError } from "./domain-error";

export class InvalidIdError extends Error implements DomainError{
    constructor(id: string){
        super(`this id ${id} is invalid`);
        this.name = 'InvalidIdError'
    }
}