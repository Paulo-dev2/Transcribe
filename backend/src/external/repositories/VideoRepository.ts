import fs from "fs";
const path = require('path');

export class VideoRepository{
    public async createTranscribe(videoFileName: any, transcript: any){
        console.log(videoFileName, transcript)
        try{
            if(videoFileName && transcript){
                await fs.writeFileSync(`${videoFileName}.txt`,transcript)
                fs.unlinkSync(videoFileName)
                return transcript
            }
        }catch(err){
            console.log(err)
        }
    }
}