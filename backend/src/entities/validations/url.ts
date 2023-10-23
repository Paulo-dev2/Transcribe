import { Either, left, right } from '../../shared/either';
import { InvalidUrl } from './erros/invalid-url';

export class Url {
  private readonly url: string

  private constructor (url: string) {
    this.url = url
    Object.freeze(this)
  }

  static create (url: string): Either<InvalidUrl, Url> {
    if (!Url.validate(url)) {
      return left(new InvalidUrl(url))
    }
    return right(new Url(url))
  }

  get value (): string {
    return this.url
  }

  static validate (url: string): boolean {
    const tester = /^(https?|ftp):\/\/[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/
    if(!url) return false
    if(!tester.test(url)) return false
    return true
  }
}
