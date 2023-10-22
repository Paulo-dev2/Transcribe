"use client";

import { api } from "@/service/api";
import { videoCreateFail, videoCreateRequest, videoCreateSuccess } from "../reducers/video";

export const createVideo = (url: string) => async (dispatch: any) => {
    try{
        dispatch(videoCreateRequest());
        const {data} = await api.post("/video/create-video",{data: url});
        if(data.notification){
            const notification = data.notification;
            dispatch(videoCreateSuccess(notification));
        }
    }catch (error){
        console.log(error);
        dispatch(videoCreateFail("Error"));
    }
}