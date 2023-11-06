import { GetVideos } from "../../domain/usecases/get-videos/get-video";
import { ok } from "../../infra/helpers/http-helper";
import { HttpRequest, HttpResponse } from "../../infra/ports/http";

export class ViewDownloadsVideosController{
    constructor(
        private readonly getVideos: GetVideos
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        const response = await this.getVideos.getVideos();

        return ok(response);
    }
}