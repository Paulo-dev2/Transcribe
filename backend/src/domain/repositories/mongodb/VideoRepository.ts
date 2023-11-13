import { VideoData } from '../../entities/video/VideoData';
import { MongoHelper } from './helpers/mongo-helper';
import { ObjectId } from 'mongodb';
import "dotenv/config";

// Importando módulos e bibliotecas necessárias

// Repositório de dados, onde tem opções como create, findById, findByUrl, entre outros.
// Esta classe serve como um repositório para armazenar dados relacionados a vídeos.

export class VideoRepository {
  // Declaração da classe VideoRepository.

  constructor(private readonly db = MongoHelper) {}
  // Construtor que aceita uma instância do MongoHelper (ou seu substituto) como argumento.

  public async create(video: any, transcript: any, videoFile: any, videoOBJ: any) {
    // Método para criar um novo registro de vídeo no banco de dados.

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
    // Cria um objeto VideoData com os dados do vídeo.

    try {
      await this.db.getCollection('transcribes').insertOne(videoData);
      // Insere os dados do vídeo no banco de dados.
    } catch (error) {
      console.error('Error writing to file:', error);
      // Registra um erro se ocorrer uma exceção ao escrever no banco de dados.
    }

    return videoData;
    // Retorna os dados do vídeo que foram inseridos no banco de dados.
  }

  public async findByUrl(video: any){
    // Método para buscar um vídeo com base na URL.

    const url: string  = video.url;

    return await this.db.getCollection('transcribes').findOne({url:url})
    // Procura no banco de dados o registro de vídeo com a URL especificada.
  }

  public async findById(video: any){
    // Método para buscar um vídeo com base no ID.

    const id = new ObjectId(video.id);
    return await this.db.getCollection('transcribes').findOne({_id: id})
    // Procura no banco de dados o registro de vídeo com o ID especificado.
  }

  public async findAll(): Promise<Array<VideoData>>{
    // Método para buscar todos os registros de vídeo no banco de dados.

    return await this.db.getCollection('transcribes').find({}).toArray();
    // Retorna uma matriz de todos os registros de vídeo no banco de dados.
  }

  public async findLastThree(): Promise<Array<VideoData>>{
    // Método para buscar os últimos três registros de vídeo no banco de dados.

    return await this.db.getCollection('transcribes').find({}).sort({'createdAt': -1}).limit(3).toArray();
    // Retorna uma matriz dos três registros de vídeo mais recentes no banco de dados, ordenados por data de criação.
  }

  public async deleteById(video: any): Promise<boolean> {
    // Método para excluir um registro de vídeo com base no ID.

    const id = new ObjectId(video.id);
    await this.db.getCollection('transcribes').deleteMany({_id:id});
    // Exclui do banco de dados o registro de vídeo com o ID especificado.

    return true;
    // Retorna verdadeiro para indicar que a exclusão foi bem-sucedida.
  }

  public async updateById(video: any, videoData: any): Promise<boolean>{
    // Método para atualizar um registro de vídeo com base no ID.

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
    );
    // Atualiza os dados do vídeo no banco de dados com o novo transcript e a data de atualização.

    return result.matchedCount > 0;
    // Retorna verdadeiro se houve correspondência de registros para atualização.
  }

  public async updateByIdFile(video: any, videoFile: any): Promise<boolean>{
    // Método para atualizar o URL do vídeo de um registro com base no ID.

    const id = new ObjectId(video.id);
    const updateAt = new Date();
    const url: any = `${process.env.HOST_VIDEO}/${videoFile}`;
    const result = await this.db.getCollection('transcribes').updateOne(
      {_id: id},
      {
        $set:{
          videoUrl: url,
          updateAt: updateAt,
        }
      }
    );
    // Atualiza o URL do vídeo no banco de dados com o novo URL e a data de atualização.

    return result.matchedCount > 0;
    // Retorna verdadeiro se houve correspondência de registros para atualização.
  }
}
