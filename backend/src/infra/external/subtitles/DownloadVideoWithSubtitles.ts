const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

// Ela é uma classe para legendar um vídeo, mas por algum motivo não mostra erro e não está legendado ele.

export class DownloadVideoWithSubtitles {
  private downloadPath = path.resolve(__dirname, '..', '..', '..', 'shared', 'uploads');

  public async subtitles(audioFile: string, subtitles: string, video: string) {
    const videoName = audioFile.split('uploads')[1].replace('/', '');
    const file = `${videoName}-1920x1080.mp4`;
    const output: any = path.join(this.downloadPath, file);

    return new Promise((resolve, reject) => {
      ffmpeg(video)
        .input(audioFile)
        .videoCodec('libx264')
        .audioCodec('aac')
        .input(subtitles) // Use o novo arquivo de legendas aqui
        .inputFormat('srt') // Especifique o formato SRT
        .size('1920x1080')
        .on('error', (err: any) => {
          console.error('Erro ao criar o vídeo com legendas:', err);
          reject(err);
        })
        .output(output)
        .on('end', () => {
          console.log('Vídeo com legendas incorporadas foi criado com sucesso.');
          resolve(output);
        })
        .run();
    });
  }
}
