import { DomainError } from "./domain-error";

export class InvalidUrl extends Error implements DomainError{
    constructor(url: string){
        super(`this url ${url} isinvalid`);
        this.name = 'InvalidUrlError'
    }
}