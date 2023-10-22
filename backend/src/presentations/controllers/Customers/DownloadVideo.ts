import { ok } from "../../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../../ports/http";

export class DownloadVideo{
    constructor(){

    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{

        return ok({
            sucess: true
        });
    }
}