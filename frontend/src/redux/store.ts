"use client";
import { configureStore } from '@reduxjs/toolkit';
import videoReducer from '@/redux/reducers/video';

const store = configureStore({
  reducer: {
    video: videoReducer, // Adicione outros reducers aqui, se necessário
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;