import { GetVideoById } from "../../domain/usecases/get-video-by-id/get-video-by-id";
import { ShorterLengthError } from "../../infra/errors/len-request-error";
import { badRequest, ok } from "../../infra/helpers/http-helper";
import { HttpRequest, HttpResponse } from "../../infra/ports/http";

export class ViewVideoByIdController{
    constructor(
        private readonly getVideoById: GetVideoById
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        const receivedFields: Array<String> = Object.keys(httpRequest.params);
        const requiredFields: Array<String> = ['id'];
        const missingFields = requiredFields.filter(field => !receivedFields.includes(field));
        if(missingFields.length > 0 ) return badRequest( new ShorterLengthError(requiredFields.length));

        const {id} = httpRequest.params;

        const response = await this.getVideoById.getVideoById(id);

        return ok(response);
    }
}