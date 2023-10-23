import { UsecaseError } from "./usecase-error";

export class TesteError extends Error implements UsecaseError{
    constructor(){
        super("Teste exists");
        this.name = 'ErrorTeste';
    }
}