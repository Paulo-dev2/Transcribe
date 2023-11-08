import { VideoData } from '../../entities/video/VideoData';
import { MongoHelper } from './helpers/mongo-helper';
import { ObjectId } from 'mongodb';

export class VideoRepository {

  constructor(private readonly db = MongoHelper) {}

  public async create(video: any, transcript: any) {
    const url: string = video.url;

    const videoData: VideoData = {
      url,
      transcript,
      createdAt: new Date(),
      updateAt: new Date(),
      videoUrl: ''
    };

    try {
      await this.db.getCollection('transcribes').insertOne(videoData);
    } catch (error) {
      console.error('Error writing to file:', error);
    }

    return videoData;
  }

  public async findByUrl(video: any){
    const url: string  = video.url;

    return await this.db.getCollection('transcribes').findOne({url:url})
  }

  public async findById(video: any){
    const id = new ObjectId(video.id);
    return await this.db.getCollection('transcribes').findOne({_id: id})
  }

  public async findAll(): Promise<Array<VideoData>>{
    return await this.db.getCollection('transcribes').find({}).toArray();
  }

  public async deleteById(video: any): Promise<boolean> {
    const id = new ObjectId(video.id);
    await this.db.getCollection('transcribes').deleteMany({_id:id})
    return true
  }
  
}
