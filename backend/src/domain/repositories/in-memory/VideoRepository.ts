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
      console.error('Error writing to file:', error);
    }

    return videoData;
  }

  public async findByUrl(video: any){
    const url: string  = video.url;

    return this.jsonData.find( record => record.url == url)
  }

  public async findById(video: any){
    const id: string = video.id;
    return this.jsonData.find( record => record.id == id)
  }

  public async findAll(): Promise<Array<VideoData>>{
    return this.jsonData
  }

  public async deleteById(video: any): Promise<boolean> {
    const id: string = video.id;
    this.jsonData = this.jsonData.filter((record) => record.id !== id);
  
    try {
      const jsonData = JSON.stringify(this.jsonData, null, 2);
      await fs.writeFile(this.filePath, jsonData, 'utf8');
      await this.loadData();
      return true;
    } catch (error) {
      console.error('Erro ao escrever no arquivo:', error);
      return false;
    }
  }
  
}
