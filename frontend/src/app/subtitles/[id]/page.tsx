"use client";

import * as C from '@/styles/index';
import { useVideoGet } from '@/hooks/get-video-by-id';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { useAlert } from '@/hooks/alert';
import { Subtitles } from '@/components/Subtitles';

export default function Transcribe() {
  const { isLoading, transcript, success, video, getVideoById } = useVideoGet();
  const {setAlert} = useAlert();
  const pathname = usePathname();
  let id;

  useEffect( () => {
    const getData = async () => {
        id = pathname.split('/')[2];
        try {
            await getVideoById(id);
            setAlert("success", "Carregado com sucesso");
        } catch (error) {
            setAlert("error", "Aconteceu algum erro, tente novamente")
        }

    }
    getData()
  }, [success])

  return (
    <C.Loading $loading={isLoading} data-message={"Legedando"}>
        {success && (
         <Subtitles
         transcription={transcript}
          videoUrl={video}
          id={id}
          success={success}
         />
        )}
    </C.Loading>
  )
}
