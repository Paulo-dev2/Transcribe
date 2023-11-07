import { UsecaseError } from "./usecase-error";

export class IdError extends Error implements UsecaseError{
    constructor(){
        super("Id not exists");
        this.name = 'ErrorID';
    }
}