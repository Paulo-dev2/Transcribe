const YoutubeMp3Downloader = require('../lib/download-mp3');
import ffmpegStatic from 'ffmpeg-static';
import EventBus from '../Events/EventBus';
const path = require('path');

// Esta classe é responsável pelo o download de um vídeo do youtube em mp3.

export class VideoDownloader {
    private YD: typeof YoutubeMp3Downloader;
    private ffStatic: any = ffmpegStatic;
    private downloadPath = path.resolve(__dirname, '..','..','..','shared','uploads');
    private eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.YD = new YoutubeMp3Downloader({
            ffmpegPath: this.ffStatic.path,
            outputPath: this.downloadPath,
            queueParallelism: 2,
            youtubeVideoQuality: 'highestaudio'
        });
        this.eventBus = eventBus;
    }

    download(video: any): Promise<string> {
        const [, part2] = video.url.split('?v=');
        const [videoId] = part2.split("&");
        return new Promise(async (resolve, reject) => {
            await this.YD.download(videoId);
            this.YD.on('progress', (data: any) => {
                const progress: number = data.progress.percentage.toFixed(2);

                console.log( progress + '% downloaded')

                this.eventBus.emitProgress(progress)
            });
            this.YD.on('finished', (err: Error, video: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(video);
                }
            });
        });
    }
}
