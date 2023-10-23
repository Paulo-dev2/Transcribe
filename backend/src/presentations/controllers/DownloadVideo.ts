import { DownloadVideo } from "../../usecases/download-video/download-video";
import { ShorterLengthError } from "../errors/len-request-error";
import { badRequest, ok } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../ports/http";

export class DownloadVideoController{
    constructor(
        private readonly downloadVideo: DownloadVideo
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        const receivedFields: Array<String> = Object.keys(httpRequest.body);
        const requiredFields: Array<String> = ['url'];
        const missingFields = requiredFields.filter(field => !receivedFields.includes(field));
        if(missingFields.length > 0 ) return badRequest( new ShorterLengthError(requiredFields.length));
        const {url} = httpRequest.body
        const videoData = url
        const response = await this.downloadVideo.downloadVideo(videoData);
        return ok({notification:response});
    }
}