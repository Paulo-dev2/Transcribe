"use client";

import { useVideo } from '@/hooks/download-video';
import * as C from '@/styles/index';
import { Main } from '@/components/Home';
import { useState } from 'react';
import Progress from '@/components/Progress';
import { downloadTranscription, urlIsValid } from '@/functions/main';
import { AlertType } from '@/components/Alert';

export default function Transcribe() {

  const { isLoading, transcript, success, error, createVideo } = useVideo();
  const [url, setUrl] = useState<string>("");
  const [alert, setAlert] = useState({
    severity: "",
    title: "",
    message: ""
  });

  const handleChangeUrl = ({ value }: any) => setUrl(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (urlIsValid(url)) {
        await createVideo({ url });
        if (success) 
          setAlert({severity: "success", title: "Transcrição", message: "Transcrição feita com sucesso"})
        else
        setAlert({severity: "error", title: "Error", message: "Aconteceu algum erro, tente novamente"})
      } else {
          setAlert({severity: "warning", title: "Atenção", message: "Url inválida"})
      }
    } catch (error) {
      setAlert({severity: "error", title: "Error", message: "Aconteceu algum erro, tente novamente"})
    }

  }

  return (
    <C.Loading $loading={isLoading} data-message={Progress()}>
      {alert.message.length > 1 && (
        <AlertType severity={alert.severity} title={alert.title} message={alert.message} />
      )}
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
