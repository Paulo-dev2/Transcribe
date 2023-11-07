import { DeleteVideoByIdResponse } from "./delete-video-by-id-response";

export interface IDeleteVideoById{
    deleteVideoById: (videoData: string) => Promise<DeleteVideoByIdResponse>
}