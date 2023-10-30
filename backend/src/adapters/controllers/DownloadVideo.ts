import { DownloadVideo } from "../../domain/usecases/download-video/download-video";
import { badRequest, ok } from "../../infra/helpers/http-helper";
import { HttpRequest, HttpResponse } from "../../infra/ports/http";
import { ShorterLengthError } from "../../infra/errors/len-request-error";

export class DownloadVideoController{
    constructor(
        private readonly downloadVideo: DownloadVideo
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        const receivedFields: Array<String> = Object.keys(httpRequest.body);
        const requiredFields: Array<String> = ['url'];
        const missingFields = requiredFields.filter(field => !receivedFields.includes(field));
        if(missingFields.length > 0 ) return badRequest( new ShorterLengthError(requiredFields.length));
        const {url} = httpRequest.body;
        const videoData = url;
        const response = await this.downloadVideo.downloadVideo(videoData);
        return ok(response);
    }
}