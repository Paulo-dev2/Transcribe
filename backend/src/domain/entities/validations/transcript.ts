import { Either, left, right } from '../../../shared/either';
import { InvalidTranscriptError } from './erros/invalid-transcript';

// Importando módulos e tipos de dados necessários

export class Transcript {
  // Declaração da classe Transcript.

  private readonly transcript: Record<string, string>;

  private constructor(transcript: Record<string, string>) {
    // Construtor privado da classe, que aceita um objeto de transcrição.
    this.transcript = transcript;
    Object.freeze(this);
    // Torna o objeto imutável após a inicialização.
  }

  static create(transcript: Record<string, string>): Either<InvalidTranscriptError, Transcript> {
    // Método estático que cria uma instância de Transcript e valida o objeto de transcrição.

    if (!Transcript.validate(transcript)) {
      return left(new InvalidTranscriptError(transcript));
      // Se o objeto de transcrição não for válido, retorna um objeto 'Either' com um erro.
    }
    return right(new Transcript(transcript));
    // Se o objeto de transcrição for considerado válido, retorna um objeto 'Either' com a instância de Transcript.
  }

  get value(): Record<string, string> {
    // Método 'get' para acessar o valor do objeto de transcrição.
    return this.transcript;
  }

  static validate(obj: any): obj is Record<string, string> {
    return (
      typeof obj === 'object' &&
      Object.keys(obj).every((time) => {
        const text = obj[time];
        return typeof time === 'string' && typeof text === 'string' && text.length > 0;
      })
    );
    // Função de validação que verifica se o objeto é um registro (record) de strings não vazias.
  }
}
