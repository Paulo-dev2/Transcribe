const path = require('path');
import fs from 'fs';
import { Encoder } from '../encoder';

export class ConvertToSrt {
    private downloadPath = path.resolve(__dirname, '..','..','..','shared','uploads');
    constructor(private readonly encoder: Encoder){}
    public async convert(transcription: any) {
        let srt = '';
        let index = 1;
        const file = await this.encoder.encode('teste')
        const fileSrt = `${this.downloadPath}/${file}.srt`

        for (const timeRange in transcription) {
            if (transcription.hasOwnProperty(timeRange)) {
                const text = transcription[timeRange];

                srt += index + '\n';
                srt += timeRange.replace(/\./g, ',') + '\n'; // Substituir ponto por vírgula no tempo
                srt += text + '\n\n';

                index++;
            }
        }
        const output = await this.addColorFormattingToSRT(srt)
        await fs.writeFileSync(fileSrt, output, 'utf-8');
        return fileSrt;
    }

    public async addColorFormattingToSRT(inputSrt: any){
        try {
            const srtContent = inputSrt
        
            // Dividir o conteúdo do SRT em legendas individuais
            const subtitles = srtContent.split('\n\n');
        
            // Função para adicionar formatação de cor a um texto
            function addColorFormatting(text: any) {
              return `[color #fff]${text}[/color]`;
            }
        
            // Aplicar formatação de cor a cada legenda
            const formattedSubtitles = subtitles.map((subtitle: any, index: any) => {
              const lines = subtitle.split('\n');
              // A primeira linha é o número da legenda
              // A segunda linha é o tempo
              // As linhas restantes contêm o texto da legenda
              const textLines = lines.slice(2);
              // Aplicar formatação de cor a cada linha de texto
              const formattedText = textLines.map(addColorFormatting);
              // Recriar a legenda com a formatação de cor
              return [index + 1, lines[1], ...formattedText].join('\n');
            });
        
            // Recriar o conteúdo SRT com as legendas formatadas
            const formattedSRTContent = formattedSubtitles.join('\n\n');
        
            // Retorna o conteúdo formatado
            return formattedSRTContent;
        
          } catch (error) {
            console.error('Erro ao adicionar formatação de cor:', error);
          }
    }
}
