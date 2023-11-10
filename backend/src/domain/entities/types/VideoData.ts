export type VideoDataUpdate = {
    id: string,
    transcript: Record<string, string>
}

export type VideoDataSubtitles = {
    id: string,
    transcript: Record<string, string>,
    videoUrl: string,
    videoFile: string
}