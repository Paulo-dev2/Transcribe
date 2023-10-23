import { Either, left, right } from "../../../shared/either";
import { InvalidUrl } from "../../validations/erros/invalid-url";
import { Url } from "../../validations/url";

export class Register{
    constructor(
        public readonly url: string
    ){
        Object.freeze(this);
    }

    static register(urlData: string): Either<InvalidUrl, Register>{
        const urlOrError: Either<InvalidUrl, Url> = Url.create(urlData);

        if(urlOrError.isLeft()) return left(urlOrError.value);

        const url: Url = urlOrError.value;

        return right(new Register(url.value));
    }
}