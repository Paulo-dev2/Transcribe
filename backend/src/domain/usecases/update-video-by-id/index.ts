import { VideoDataUpdate } from "../../entities/types/VideoData";
import { UpdateVideoByIdResponse } from "./update-video-by-id-response";

export interface IUpdateVideoById{
    updateVideoById: (videoData: VideoDataUpdate) => Promise<UpdateVideoByIdResponse>
}