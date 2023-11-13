import readline from 'readline';
import path from 'path';
import fs from 'fs';
import ytdl from 'ytdl-core';

// Esta classe baixa o vídeo em mp4, para que depois legendasse ele, 
// mas não estamos usando ele porque não está dando certo a parte para legendar

export class VideoDownloadeMp4 {
    private downloadPath = path.resolve(__dirname, '..', '..', '..', 'shared', 'uploads');

    async download(url: string, id: string): Promise<{ filePath: string, fileName: string }> {
        const video = ytdl(url);
        let starttime: any;
        const file = `${id}.mp4`
        const output: any = path.join(this.downloadPath, file);

        return new Promise<{ filePath: string, fileName: string }>((resolve, reject) => {
            video.pipe(fs.createWriteStream(output));
            video.once('response', () => {
                starttime = Date.now();
            });
            video.on('progress', (chunkLength: any, downloaded: any, total: any) => {
                const percent = downloaded / total;
                const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
                const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
                process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
                process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)} minutes`);
                process.stdout.write(`, estimated time left: ${estimatedDownloadTime.toFixed(2)} minutes `);
                readline.moveCursor(process.stdout, 0, -1);
            });
            video.on('end', () => {
                process.stdout.write('\n\n');
                resolve({ filePath: output, fileName: file });
            });
            video.on('error', (err: any) => {
                reject(err);
            });
        });
    }
}
