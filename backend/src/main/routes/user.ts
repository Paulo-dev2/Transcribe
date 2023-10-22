import { Router } from "express";
import "dotenv/config";
import fs from "fs";
const path = require('path');
const YoutubeMp3Downloader = require('youtube-mp3-downloader')
const { Deepgram } = require('@deepgram/sdk')

import ffmpegStatic from 'ffmpeg-static'

const routeUser = Router();

routeUser.post("/video/create-video", async (req, res) => {
    const urlFull = req.body.data.url;
    const [, part2] = urlFull.split('?v=');
    const [videoId] = part2.split("&");
    const ffStatic: any = ffmpegStatic;
    const downloadPath = path.resolve(__dirname, '..','..','shared','uploads');
    const key = process.env.DEEPGRAM;
    const deepgram = new Deepgram(key);

    const YD = new YoutubeMp3Downloader({
        ffmpegPath: ffStatic,
        outputPath: downloadPath,
        youtubeVideoQuality: 'highestaudio',
    });

    YD.download(videoId);

    YD.on('progress', (data: any) => {
        console.log(data.progress.percentage + '% downloaded')
    })
      
    YD.on('finished', async (err: any, video: any) => {
        const videoFileName = video.file;
        
        const file = {
            buffer: fs.readFileSync(videoFileName),
            mimetype: 'audio/mp3',
        }
        const options = {
            punctuate: true,
            utterances: true
        }

        const result = await deepgram.transcription
            .preRecorded(file, options)
            .catch((e: any) => console.log(e))

        const transcript = result.toWebVTT()


        await fs.writeFileSync(`${videoFileName}.txt`,transcript)
        fs.unlinkSync(videoFileName)
    });
    return res.send({notification: "Certo"})

});

export {routeUser};
