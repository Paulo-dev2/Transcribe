import { Either, left, right } from '../../../shared/either';
import { InvalidUrlError } from './erros/invalid-url';

// Importando módulos e tipos de dados necessários

export class Url {
  // Declaração da classe Url.

  private readonly url: string;

  private constructor(url: string) {
    // Construtor privado da classe, que aceita uma string como URL.
    this.url = url;
    Object.freeze(this);
    // Torna o objeto imutável após a inicialização.
  }

  static create(url: string): Either<InvalidUrlError, Url> {
    // Método estático que cria uma instância de Url e valida a URL.

    if (!Url.validate(url)) {
      return left(new InvalidUrlError(url));
      // Se a URL não for válida, retorna um objeto 'Either' com um erro.
    }
    return right(new Url(url));
    // Se a URL for considerada válida, retorna um objeto 'Either' com a instância de Url.
  }

  get value(): string {
    // Método 'get' para acessar o valor da URL.
    return this.url;
  }

  static validate(url: string): boolean {
    // Função de validação que verifica se a URL segue um padrão específico.

    const tester = /^(https?|ftp):\/\/[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/;
    // Expressão regular para validar a URL.

    if (!url || url == null || url == undefined) return false;
    // Verifica se a URL é nula, indefinida ou vazia e retorna falso.

    if (!tester.test(url)) return false;
    // Verifica se a URL corresponde à expressão regular e retorna falso se não corresponder.

    return true;
    // Se a URL for válida, retorna verdadeiro.
  }
}
