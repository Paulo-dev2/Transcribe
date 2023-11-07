import { GetVideoByIdResponse } from "./get-video-by-id-response";

export interface IGetVideoById{
    getVideoById: (videoData: string) => Promise<GetVideoByIdResponse>
}