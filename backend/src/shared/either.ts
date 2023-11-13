export type Either<L, A> = Left<L, A> | Right<L, A>;
// Define um tipo genérico 'Either' que pode ser 'Left' ou 'Right'.

export class Left<L, A> {
  // Classe que representa o estado 'Left' (erro).

  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
    // Método que verifica se esta instância é 'Left'.
  }

  isRight(): this is Right<L, A> {
    return false;
    // Método que verifica se esta instância é 'Right'.
  }
}

export class Right<L, A> {
  // Classe que representa o estado 'Right' (sucesso).

  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
    // Método que verifica se esta instância é 'Left'.
  }

  isRight(): this is Right<L, A> {
    return true;
    // Método que verifica se esta instância é 'Right'.
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left<L, A>(l);
  // Função que cria uma instância 'Left' com um valor do tipo 'L'.
}

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
  // Função que cria uma instância 'Right' com um valor do tipo 'A'.
}
