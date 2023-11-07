import { Either, left, right } from "../../../../shared/either";
import { InvalidUrlError } from "../../validations/erros/invalid-url";
import { Url } from "../../validations/url";

export class Register{
    constructor(
        public readonly url: string
    ){
        Object.freeze(this);
    }

    static register(urlData: string): Either<InvalidUrlError, Register>{
        const urlOrError: Either<InvalidUrlError, Url> = Url.create(urlData);

        if(urlOrError.isLeft()) return left(urlOrError.value);

        const url: Url = urlOrError.value;

        return right(new Register(url.value));
    }
}