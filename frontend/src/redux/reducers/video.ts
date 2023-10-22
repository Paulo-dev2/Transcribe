"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  video: null,
  success: false
};

interface IParams {
    isLoading: boolean,
    video: any,
    success: boolean
}

export const videoSlice = createSlice({
    name: "Video",
    initialState,
    reducers: {
        videoCreateRequest: (state) => {
            state.isLoading = true;
        },
        videoCreateSuccess: (state: IParams, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.video = action.payload;
            state.success = true;
        },
        videoCreateFail: (state: IParams, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.video = action.payload;
            state.success = false;
        }
    }
});
export const {videoCreateRequest, videoCreateSuccess, videoCreateFail} = videoSlice.actions;
export default videoSlice.reducer;