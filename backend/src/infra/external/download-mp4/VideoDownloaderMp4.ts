import readline from 'readline';
import path from 'path';
import fs from 'fs';
const ytdl = require('../lib/ytdl-core');

// Importando as bibliotecas necessárias

// Esta classe baixa o vídeo em mp4, para que depois legendasse ele, 
// Comentário de descrição da classe, explicando que a classe é usada para baixar vídeos no formato MP4 com a intenção de adicionar legendas posteriormente, mas a parte de legendar não está funcionando corretamente.

export class VideoDownloadeMp4 {
    // Declaração da classe VideoDownloadeMp4

    private downloadPath = path.resolve(__dirname, '..', '..', '..', 'shared', 'uploads');
    // Definindo a propriedade 'downloadPath' com o caminho onde os vídeos serão salvos.

    async download(url: string, id: string): Promise<{ filePath: string, fileName: string }> {
        // Definindo um método chamado 'download' que aceita uma URL e um ID como argumentos e retorna uma promessa com informações do arquivo.

        const video = ytdl(url);
        // Criando uma instância do vídeo a ser baixado usando a biblioteca 'ytdl-core'.

        let starttime: any;
        // Declaração de uma variável para rastrear o tempo de início do download.

        const file = `${id}.mp4`
        // Definindo o nome do arquivo de saída com base no ID fornecido.

        const output: any = path.join(this.downloadPath, file);
        // Combinando o caminho de destino com o nome do arquivo para obter o caminho completo de saída.

        return new Promise<{ filePath: string, fileName: string }>((resolve, reject) => {
            // Retornando uma nova promessa que envolve todo o processo de download.

            video.pipe(fs.createWriteStream(output));
            // Iniciando o download do vídeo, redirecionando-o para um fluxo de escrita em arquivo.

            video.once('response', () => {
                // Evento disparado quando a resposta do servidor é recebida.
                starttime = Date.now();
                // Registrando o tempo de início do download.

            });

            video.on('progress', (chunkLength: any, downloaded: any, total: any) => {
                // Evento disparado para monitorar o progresso do download.
                const percent = downloaded / total;
                // Calculando a porcentagem do download concluído.
                const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
                // Calculando o tempo decorrido em minutos.
                const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
                // Calculando o tempo estimado restante.

                readline.cursorTo(process.stdout, 0);
                // Reposicionando o cursor no console.
                process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
                // Exibindo a porcentagem de conclusão do download.
                process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
                // Exibindo o tamanho baixado e o tamanho total em megabytes.
                process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)} minutes`);
                // Exibindo o tempo decorrido em minutos.
                process.stdout.write(`, estimated time left: ${estimatedDownloadTime.toFixed(2)} minutes `);
                // Exibindo o tempo estimado restante.
                readline.moveCursor(process.stdout, 0, -1);
                // Movendo o cursor para a linha anterior no console.

            });

            video.on('end', () => {
                // Evento disparado quando o download é concluído.
                process.stdout.write('\n\n');
                // Adicionando quebras de linha no console.
                resolve({ filePath: output, fileName: file });
                // Resolvendo a promessa com o caminho e nome do arquivo de saída.
            });

            video.on('error', (err: any) => {
                // Evento disparado em caso de erro durante o download.
                reject(err);
                // Rejeitando a promessa com o erro.
            });
        });
    }
}
