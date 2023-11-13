import { GetLastVideos } from "../../domain/usecases/get-last-videos/get-last-videos";
import { ok } from "../../infra/helpers/http-helper";
import { HttpRequest, HttpResponse } from "../../infra/ports/http";

export class ViewDownloadsLastVideosController{
    constructor(
        private readonly getLastVideos: GetLastVideos
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        const response = await this.getLastVideos.getLastVideos();

        return ok(response);
    }
}