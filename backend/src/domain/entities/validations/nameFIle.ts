import { Either, left, right } from '../../../shared/either';
import { InvalidUrlError } from './erros/invalid-url';

export class NameFIle {
  private readonly file: string

  private constructor (file: string) {
    this.file = file
    Object.freeze(this)
  }

  static create (file: string): Either<InvalidUrlError, NameFIle> {
    if (!NameFIle.validate(file)) {
      return left(new InvalidUrlError(file))
    }
    return right(new NameFIle(file))
  }

  get value (): string {
    return this.file
  }

  static validate (file: string): boolean {
    return true
  }
}
