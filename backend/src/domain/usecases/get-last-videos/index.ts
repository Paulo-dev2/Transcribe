import { GetLastVideosResponse } from "./get-videos-response";

export interface IGetLastVideos{
    getLastVideos: () => Promise<GetLastVideosResponse>
}