import { Either, left, right } from '../../../shared/either';
import { InvalidIdError } from './erros/invalid-id';

// Importando módulos e tipos de dados necessários

export class Id {
  // Declaração da classe Id.

  private readonly id: string;

  private constructor(id: string) {
    // Construtor privado da classe, que aceita uma string como identificador.
    this.id = id;
    Object.freeze(this);
    // Torna o objeto imutável após a inicialização.
  }

  static create(id: string): Either<InvalidIdError, Id> {
    // Método estático que cria uma instância de Id e valida o identificador.

    if (!Id.validate(id)) {
      return left(new InvalidIdError(id));
      // Se o identificador não for válido, retorna um objeto 'Either' com um erro.
    }
    return right(new Id(id));
    // Se o identificador for válido, retorna um objeto 'Either' com a instância de Id.
  }

  get value(): string {
    // Método 'get' para acessar o valor do identificador.
    return this.id;
  }

  static validate(uuid: string): boolean {
    // Método estático que valida o identificador.

    const uuidRegex = /^[0-9a-f]{24}$/i;
    // Expressão regular para validar o formato do identificador.

    if (!uuid) {
      return false;
      // Se o identificador for nulo ou vazio, retorna falso.
    }
    if (!uuidRegex.test(uuid)) {
      return false;
      // Se o identificador não corresponder à expressão regular, retorna falso.
    }
    return true;
    // Se o identificador for válido, retorna verdadeiro.
  }
}
