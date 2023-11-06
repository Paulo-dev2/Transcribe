import { GetVideosResponse } from "./get-videos-response";

export interface IGetVideos{
    getVideos: () => Promise<GetVideosResponse>
}