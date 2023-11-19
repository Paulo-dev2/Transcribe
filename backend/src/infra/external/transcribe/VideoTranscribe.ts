import { Deepgram } from '@deepgram/sdk';
import { PrerecordedTranscriptionResponse } from '@deepgram/sdk/dist/types';
import fs from 'fs';

// Importando as bibliotecas e módulos necessários

// Esta classe é responsável por transcrever o vídeo e depois formatá-lo no formato SRT.
// Comentário de descrição da classe, explicando que a classe é usada para realizar transcrições de vídeo e formatar a transcrição em SRT.

export class VideoTranscriber {
    // Declaração da classe VideoTranscriber.

    private deepgram: Deepgram;
    private key: string | any = process.env.DEEPGRAM;
    private transcriptFormated: string;

    constructor() {
        // Método construtor da classe.

        this.deepgram = new Deepgram(this.key);
        // Inicialização da instância Deepgram com a chave especificada.
        this.transcriptFormated = "";
        // Inicialização da propriedade 'transcriptFormated' como uma string vazia.

    }

    public async transcribe(videoFile: any) {
        // Método 'transcribe' que aceita um arquivo de vídeo como argumento.

        const videoBuffer = fs.readFileSync(videoFile);
        const file = {
            buffer: videoBuffer,
            mimetype: 'audio/mp3',
        };
        // Lendo o conteúdo do arquivo de vídeo em formato mp3.

        const options = {
            punctuate: true,
            utterances: true,
            detect_language: true,
        };
        // Definindo opções para a transcrição.

        const result = await this.deepgram.transcription
            .preRecorded(file, options)
            .catch((e: any) => console.log(e));
        // Realizando a transcrição do vídeo usando Deepgram.

        if (result && (result as PrerecordedTranscriptionResponse).toWebVTT) {
            // Verificando se o resultado é válido e se possui a propriedade 'toWebVTT'.
            const transcript = (result as PrerecordedTranscriptionResponse).toWebVTT();
            // Obtendo a transcrição no formato WebVTT.
            this.transcriptFormated = await this.transcriptFormatedData(transcript);
            // Formatando a transcrição em SRT.
            fs.unlinkSync(videoFile);
            // Removendo o arquivo de vídeo original.
            return { transcript: this.transcriptFormated, videoFile };
        } else {
            console.log("Resultado inválido.");
            // Registrando uma mensagem de erro em caso de resultado inválido.
            return ""; // Ou outro tratamento de erro adequado.
        }
    }

    public async transcriptFormatedData(transcript: string) {
        // Método para formatar a transcrição em SRT a partir de uma transcrição WebVTT.

        const lines = transcript.split('\n');

        // Inicialize o dicionário
        const subtitles: any = {};

        // Variáveis para rastrear tempo e texto
        let currentTime = '';

        // Analise as linhas
        for (const line of lines) {
            if (line.includes('-->')) {
                // Esta linha contém informações de tempo
                const [startTime, endTime] = line.split(' --> ');
                currentTime = `${startTime} --> ${endTime}`;
            } else if (line.trim() !== '' && currentTime) {
                // Esta linha contém texto
                if (!subtitles[currentTime]) {
                    subtitles[currentTime] = '';
                }
                subtitles[currentTime] += `${line} `;
            }
        }

        // Remova espaços em branco no início e no final de cada texto
        for (const key in subtitles) {
            subtitles[key] = subtitles[key].trim();
        }

        return subtitles;
        // Retorna o dicionário de legendas formatado em SRT.

    }
}
