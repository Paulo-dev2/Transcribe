import { Deepgram } from '@deepgram/sdk';
import { PrerecordedTranscriptionResponse } from '@deepgram/sdk/dist/types';
import fs from 'fs';

export class VideoTranscriber {
    private deepgram: Deepgram;
    private key: string | any = process.env.DEEPGRAM;
    private transcriptFormated: string;

    constructor() {
        this.deepgram = new Deepgram(this.key);
        this.transcriptFormated = "";
    }

    public async transcribe(videoFile: any){
        const file = {
            buffer: fs.readFileSync(videoFile),
            mimetype: 'audio/mp3',
        };
        const options = {
            punctuate: true,
            utterances: true,
            detect_language: true,
        };
        const result = await this.deepgram.transcription
            .preRecorded(file, options)
            .catch((e: any) => console.log(e));

        if (result && (result as PrerecordedTranscriptionResponse).toWebVTT) {
            // Se for, acesse a propriedade toWebVTT
            const transcript = (result as PrerecordedTranscriptionResponse).toWebVTT();
            this.transcriptFormated = await this.transcriptFormatedData(transcript)
            await fs.writeFileSync(`${videoFile}.txt`, transcript);
            fs.unlinkSync(videoFile);
            return this.transcriptFormated;
        } else {
            console.log("Resultado inválido.");
            return ""; // Ou outro tratamento de erro adequado.
        }
    }

    public async transcriptFormatedData(transcript: string){
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

    }
}
