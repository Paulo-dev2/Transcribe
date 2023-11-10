import { SubititlesVideo } from "../../domain/usecases/subtitles-video/subtitles-video";
import { ShorterLengthError } from "../../infra/errors/len-request-error";
import { badRequest, ok } from "../../infra/helpers/http-helper";
import { HttpRequest, HttpResponse } from "../../infra/ports/http";

export class SubtitlesVideoByIdController{
    constructor(
        private readonly subititlesVideo: SubititlesVideo
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        const receivedFields: Array<String> = Object.keys(httpRequest.body);
        const requiredFields: Array<String> = ['id','transcript','videoUrl', 'videoFile'];
        const missingFields = requiredFields.filter(field => !receivedFields.includes(field));
        if(missingFields.length > 0 ) return badRequest( new ShorterLengthError(requiredFields.length));

        const {id, transcript, videoUrl, videoFile} = httpRequest.body;
        const videoData = {id, transcript, videoUrl, videoFile}

        const response = await this.subititlesVideo.subititlesVideo(videoData);

        return ok(response);
    }
}