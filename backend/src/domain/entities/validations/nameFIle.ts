import { Either, left, right } from '../../../shared/either';
import { InvalidUrlError } from './erros/invalid-url';

// Importando módulos e tipos de dados necessários

export class NameFIle {
  // Declaração da classe NameFIle.

  private readonly file: string;

  private constructor(file: string) {
    // Construtor privado da classe, que aceita uma string como nome de arquivo.
    this.file = file;
    Object.freeze(this);
    // Torna o objeto imutável após a inicialização.
  }

  static create(file: string): Either<InvalidUrlError, NameFIle> {
    // Método estático que cria uma instância de NameFIle e valida o nome de arquivo.

    if (!NameFIle.validate(file)) {
      return left(new InvalidUrlError(file));
      // Se o nome de arquivo não for válido (embora a validação sempre retorne verdadeiro), retorna um objeto 'Either' com um erro.
    }
    return right(new NameFIle(file));
    // Se o nome de arquivo for considerado válido (sempre verdadeiro no código atual), retorna um objeto 'Either' com a instância de NameFIle.
  }

  get value(): string {
    // Método 'get' para acessar o valor do nome de arquivo.
    return this.file;
  }

  static validate(file: string): boolean {
    return true;
    // Esta função de validação sempre retorna verdadeiro, o que significa que qualquer nome de arquivo é considerado válido.
  }
}
