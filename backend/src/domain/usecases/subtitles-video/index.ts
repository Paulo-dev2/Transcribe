import { VideoDataSubtitles } from "../../entities/types/VideoData";
import { SubititlesVideoResponse } from "./subtitles-video-response";

export interface ISubititlesVideo{
    subititlesVideo: (videoData: VideoDataSubtitles) => Promise<SubititlesVideoResponse>
}