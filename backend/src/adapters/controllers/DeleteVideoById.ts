import { DeleteVideoById } from "../../domain/usecases/delete-video-by-id/delete-video-by-id";
import { ShorterLengthError } from "../../infra/errors/len-request-error";
import { badRequest, ok } from "../../infra/helpers/http-helper";
import { HttpRequest, HttpResponse } from "../../infra/ports/http";

export class DeleteVideoByIdController{
    constructor(
        private readonly deleteVideoById: DeleteVideoById
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        const receivedFields: Array<String> = Object.keys(httpRequest.body);
        const requiredFields: Array<String> = ['id'];
        const missingFields = requiredFields.filter(field => !receivedFields.includes(field));
        if(missingFields.length > 0 ) return badRequest( new ShorterLengthError(requiredFields.length));

        const {id} = httpRequest.body;

        const response = await this.deleteVideoById.deleteVideoById(id);

        return ok(response);
    }
}