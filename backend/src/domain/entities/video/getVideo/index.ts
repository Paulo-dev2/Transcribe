import { Either, left, right } from "../../../../shared/either";
import { Id } from "../../validations/Id";
import { InvalidIdError } from "../../validations/erros/invalid-id";

export class View{
    constructor(
        public readonly id: string
    ){
        Object.freeze(this);
    }

    static view(idData: string): Either<InvalidIdError, View>{
        const idOrError: Either<InvalidIdError, Id> = Id.create(idData);

        if(idOrError.isLeft()) return left(idOrError.value);

        const id: Id = idOrError.value;

        return right(new View(id.value));
    }
}