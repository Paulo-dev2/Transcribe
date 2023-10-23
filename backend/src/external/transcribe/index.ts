import ffmpegStatic from 'ffmpeg-static'
const YoutubeMp3Downloader = require('youtube-mp3-downloader');
const { Deepgram } = require('@deepgram/sdk');
const path = require('path');
import fs from "fs";

export class Tanscribe{
    private ffStatic: any = ffmpegStatic;
    private key = process.env.DEEPGRAM;
    private deepgram = new Deepgram(this.key);
    private downloadPath = path.resolve(__dirname, '..','..','shared','uploads');
    public async transcribe(video: any){
        const [, part2] = video.url.split('?v=');
        const [videoId] = part2.split("&");
        let videoFileName, transcript;

        const YD = new YoutubeMp3Downloader({
            ffmpegPath: this.ffStatic,
            outputPath: this.downloadPath,
            youtubeVideoQuality: 'highestaudio',
        });
    
        await YD.download(videoId);

        YD.on('progress', (data: any) => {
            console.log(data.progress.percentage.toFixed(2) + '% downloaded')
        })
          
        YD.on('finished', async (err: any, video: any) => {
            videoFileName = video.file;
            
            const file = {
                buffer: fs.readFileSync(videoFileName),
                mimetype: 'audio/mp3',
            }
            const options = {
                punctuate: true,
                utterances: true
            }
    
            const result = await this.deepgram.transcription
                .preRecorded(file, options)
                .catch((e: any) => console.log(e))
    
            transcript = result.toWebVTT();

            await fs.writeFileSync(`${videoFileName}.txt`,transcript)
            fs.unlinkSync(videoFileName)
        });

        return {videoFileName, transcript}
    }
}