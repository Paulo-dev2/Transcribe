const YoutubeMp3Downloader = require('youtube-mp3-downloader');
import ffmpegStatic from 'ffmpeg-static';
const path = require('path');

export class VideoDownloader {
    private YD: typeof YoutubeMp3Downloader;
    private ffStatic: any = ffmpegStatic;
    private downloadPath = path.resolve(__dirname, '..','..','shared','uploads');

    constructor() {
        this.YD = new YoutubeMp3Downloader({
            ffmpegPath: this.ffStatic,
            outputPath: this.downloadPath,
            queueParallelism: 2,
            youtubeVideoQuality: 'highestaudio',
        });
    }

    download(video: any): Promise<string> {
        const [, part2] = video.url.split('?v=');
        const [videoId] = part2.split("&");
        return new Promise(async (resolve, reject) => {
            await this.YD.download(videoId);
            this.YD.on('progress', (data: any) => {
                console.log(data.progress.percentage.toFixed(2) + '% downloaded')
            });
            this.YD.on('finished', (err: Error, video: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(video.file);
                }
            });
        });
    }
}
