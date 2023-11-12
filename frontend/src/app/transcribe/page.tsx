"use client";

import { useVideoDownload } from '@/hooks/download-video';
import * as C from '@/styles/index';
import { Main } from '@/components/Transcribe';
import { useState } from 'react';
import { downloadTranscription, urlIsValid } from '@/functions/main';
import { useAlert } from '@/hooks/alert';

export default function Transcribe() {
  const { isLoading, transcript, success, error, createVideo } = useVideoDownload();
  const {setAlert} = useAlert();
  const [url, setUrl] = useState<string>("");

  const handleChangeUrl = ({ value }: any) => setUrl(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (urlIsValid(url)) {
        await createVideo({ url });
        if (success) 
          setAlert("success", "Transcrição feita com sucesso")
      } else {
          setAlert( "warning", "Url inválida")
      }
    } catch (error) {
      setAlert( "error", "Aconteceu algum erro, tente novamente")
    }

  }

  return (
    <C.Loading $loading={isLoading} data-message={"Baixando e Transcrevendo"}>
        <Main
          handleChangeUrl={handleChangeUrl}
          handleSubmit={handleSubmit}
          success={success}
          transcription={transcript}
          url={url}
          downloadTranscription={downloadTranscription} />
    </C.Loading>
  )
}
