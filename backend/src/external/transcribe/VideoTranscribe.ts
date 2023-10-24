import { Deepgram } from '@deepgram/sdk';
import { PrerecordedTranscriptionResponse } from '@deepgram/sdk/dist/types';
import fs from 'fs';

export class VideoTranscriber {
    private deepgram: Deepgram;
    private key: string | any = process.env.DEEPGRAM;

    constructor() {
        this.deepgram = new Deepgram(this.key);
    }

    public async transcribe(videoFile: any){
        const file = {
            buffer: fs.readFileSync(videoFile),
            mimetype: 'audio/mp3',
        };
        const options = {
            punctuate: true,
            utterances: true,
        };
        const result = await this.deepgram.transcription
            .preRecorded(file, options)
            .catch((e: any) => console.log(e));

        if (result && (result as PrerecordedTranscriptionResponse).toWebVTT) {
            // Se for, acesse a propriedade toWebVTT
            const transcript = (result as PrerecordedTranscriptionResponse).toWebVTT();
            await fs.writeFileSync(`${videoFile}.txt`, transcript);
            fs.unlinkSync(videoFile);
            return transcript;
        } else {
            console.log("Resultado inválido.");
            return ""; // Ou outro tratamento de erro adequado.
        }
    }
}
