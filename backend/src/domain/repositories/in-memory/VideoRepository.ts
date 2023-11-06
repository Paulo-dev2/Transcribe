import fs from 'fs/promises';
import { v4 as uuid } from 'uuid';
import { VideoData } from '../../entities/video/VideoData';
import path from 'path';

export class VideoRepository {
  private filePath = path.resolve(__dirname, 'data.json');
  private jsonData: VideoData[] = [];

  constructor() {
    this.loadData();
  }

  private async loadData() {
    try {
      const fileContent = await fs.readFile(this.filePath, 'utf8');
      this.jsonData = JSON.parse(fileContent);
    } catch (error) {
      this.jsonData = [];
    }
  }

  public async create(video: any, transcript: any) {
    const url: string = video.url;

    const videoData: VideoData = {
      id: uuid(),
      url,
      transcript,
      createdAt: new Date(),
      updateAt: new Date(),
    };

    this.jsonData.push(videoData);

    try {
      const jsonData = JSON.stringify(this.jsonData, null, 2);
      await fs.writeFile(this.filePath, jsonData, 'utf8');
    } catch (error) {
      // Handle write errors
      console.error('Error writing to file:', error);
    }

    return videoData;
  }

  public async findByUrl(video: any){
    const url: string  = video.url;

    return this.jsonData.find( record => record.url == url)
  }

  public async findAll(): Promise<Array<VideoData>>{
    return await this.jsonData
  }
}
