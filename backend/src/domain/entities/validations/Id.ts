import { Either, left, right } from '../../../shared/either';
import { InvalidIdError } from './erros/invalid-id';

export class Id {
  private readonly id: string

  private constructor (id: string) {
    this.id = id
    Object.freeze(this)
  }

  static create (id: string): Either<InvalidIdError, Id> {
    if (!Id.validate(id)) {
      return left(new InvalidIdError(id))
    }
    return right(new Id(id))
  }

  get value (): string {
    return this.id
  }

  static validate (uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuid) {
      return false
    }
    if (!uuidRegex.test(uuid)) {
      return false
    }
    return true
  }
}
