import { UpdateVideoById } from "../../domain/usecases/update-video-by-id/update-video-by-id";
import { ShorterLengthError } from "../../infra/errors/len-request-error";
import { badRequest, ok } from "../../infra/helpers/http-helper";
import { HttpRequest, HttpResponse } from "../../infra/ports/http";

export class UpdateVideoByIdController{
    constructor(
        private readonly updateVideoById: UpdateVideoById
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        const receivedFields: Array<String> = Object.keys(httpRequest.body);
        const requiredFields: Array<String> = ['id','transcript'];
        const missingFields = requiredFields.filter(field => !receivedFields.includes(field));
        if(missingFields.length > 0 ) return badRequest( new ShorterLengthError(requiredFields.length));

        const {id, transcript} = httpRequest.body;
        const videoData = {id, transcript}

        const response = await this.updateVideoById.updateVideoById(videoData);

        return ok(response);
    }
}