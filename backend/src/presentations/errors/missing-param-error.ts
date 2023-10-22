import { ControllerError } from "@/presentation/errors/controller-error"

export class MissingParamError extends Error implements ControllerError {
  constructor (paramName: string) {
    super('Missing param: ' + paramName)
    this.name = 'MissingParamError'
  }
}
