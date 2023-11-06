export class ConvertToSrt{
    public convert(transcription: any){
        let srt = '';
        let index = 1;

        for (const key in transcription) {
            const timeAndText = transcription[key];
            const [timeRange, text] = timeAndText.split(' --> ');

            srt += index + '\n';
            srt += timeRange.replace('.', ',') + '\n'; // Substituir ponto por vírgula no tempo
            srt += text + '\n\n';

            index++;
        }

        return srt;
    }
}