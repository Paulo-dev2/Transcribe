const YoutubeMp3Downloader = require('../lib/download-mp3');
import ffmpegStatic from 'ffmpeg-static';
const path = require('path');

// Importando as bibliotecas e módulos necessários

// Esta classe é responsável pelo o download de um vídeo do YouTube em formato mp3.
// Comentário de descrição da classe, explicando que a classe é usada para baixar vídeos do YouTube no formato mp3.

export class VideoDownloader {
    // Declaração da classe VideoDownloader.

    private YD: typeof YoutubeMp3Downloader;
    private ffStatic: any = ffmpegStatic;
    private downloadPath = path.resolve(__dirname, '..','..','..','shared','uploads');
    // Declaração de propriedades da classe.

    constructor() {
        // Método construtor da classe.

        this.YD = new YoutubeMp3Downloader({
            ffmpegPath: this.ffStatic.path,
            outputPath: this.downloadPath,
            queueParallelism: 2,
            youtubeVideoQuality: 'highestaudio'
        });
        // Inicialização da instância de YoutubeMp3Downloader com configurações específicas.
    }

    download(video: any): Promise<string> {
        // Método 'download' que aceita um objeto 'video' e retorna uma promessa com uma string.

        const [, part2] = video.url.split('?v=');
        // Dividindo a URL do vídeo para obter a parte do vídeo ID.
        const [videoId] = part2.split("&");
        // Extraindo o ID do vídeo da parte anterior.

        return new Promise(async (resolve, reject) => {
            // Retornando uma nova promessa que envolve todo o processo de download.

            await this.YD.download(videoId);
            // Iniciando o download do vídeo especificado.

            this.YD.on('progress', (data: any) => {
                // Registrando um ouvinte de eventos para 'progress', que fornece informações sobre o progresso do download.
                const progress: number = data.progress.percentage.toFixed(2);
                // Obtendo a porcentagem de conclusão do download.

                console.log( progress + '% downloaded');
                // Exibindo a porcentagem de conclusão no console.

            });

            this.YD.on('finished', (err: Error, video: any) => {
                // Registrando um ouvinte de eventos para 'finished', que é acionado quando o download é concluído.
                if (err) {
                    reject(err);
                } else {
                    resolve(video);
                }
            });
        });
    }
}
