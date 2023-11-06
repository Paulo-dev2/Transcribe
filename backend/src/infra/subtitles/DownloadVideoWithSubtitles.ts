import { Encoder } from "../encoder";

const ffmpeg = require('fluent-ffmpeg');

export class DownloadVideoWithSubtitles{

    private encoder: Encoder;
    constructor(encoder: Encoder){
        this.encoder = encoder
    }
     public async subtitles(videoFile: any, subtitles: any){
        const outputFilePath = await this.encoder.encode(videoFile)
        return new Promise((resolve, reject) => {
            ffmpeg()
              .input(videoFile)
              .input(subtitles)
              .inputFormat('srt')
              .videoCodec('copy')
              .audioCodec('copy')
              .output(outputFilePath)
              .on('end', () => {
                console.log('Vídeo com legendas incorporadas foi criado com sucesso.');
                resolve(outputFilePath)
              })
              .on('error', (err: any) => {
                console.error('Erro ao criar o vídeo com legendas:', err);
                reject(err);
              })
              .run();
          });
     }
}