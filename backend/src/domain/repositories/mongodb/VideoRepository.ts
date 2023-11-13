import { VideoData } from '../../entities/video/VideoData';
import { MongoHelper } from './helpers/mongo-helper';
import { ObjectId } from 'mongodb';
import "dotenv/config";

// Repositorio de dados, onde têm opções como create, findById, findByUrl, entre outros.

export class VideoRepository {

  constructor(private readonly db = MongoHelper) {}

  public async create(video: any, transcript: any, videoFile: any, videoOBJ: any) {
    const url: string = video.url;

    const videoData: VideoData = {
      url,
      transcript,
      createdAt: new Date(),
      updateAt: new Date(),
      videoUrl: videoFile,
      title: videoOBJ.title,
      artist: videoOBJ.artist 
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

  public async findLastThree(): Promise<Array<VideoData>>{
    return await this.db.getCollection('transcribes').find({}).sort({'createdAt': -1}).limit(3).toArray();
  }

  public async deleteById(video: any): Promise<boolean> {
    const id = new ObjectId(video.id);
    await this.db.getCollection('transcribes').deleteMany({_id:id})
    return true
  }

  public async updateById(video: any, videoData: any): Promise<boolean>{
    const id = new ObjectId(video.id);
    const transcript = videoData.transcript;
    const updateAt = new Date();
    const result = await this.db.getCollection('transcribes').updateOne(
      {_id: id},
      {
        $set:{
          transcript: transcript,
          updateAt: updateAt,
        }
      }
    )

    return result.matchedCount > 0
  }

  public async updateByIdFile(video: any, videoFile: any): Promise<boolean>{
    const id = new ObjectId(video.id);
    const updateAt = new Date();
    const url: any = `${process.env.HOST_VIDEO}/${videoFile}`
    const result = await this.db.getCollection('transcribes').updateOne(
      {_id: id},
      {
        $set:{
          videoUrl: url,
          updateAt: updateAt,
        }
      }
    )

    return result.matchedCount > 0
  }
  
}
