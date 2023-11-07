"use client";

import { useVideo } from '@/hooks/download-video';
import * as C from '@/styles/index';
import { Main } from '@/components/Home';
import { useState } from 'react';
import Progress from '@/components/Progress';
import { downloadTranscription, urlIsValid } from '@/functions/main';

export default function Transcribe() {

  const { isLoading, transcript, success, error, createVideo } = useVideo();
  const [url, setUrl] = useState<string>("");

  const handleChangeUrl = ({ value }: any) => setUrl(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (urlIsValid(url)) {
        await createVideo({ url });
        if (success) {
          alert("Ação createVideo despachada com sucesso!");
        }
      } else {
        alert("Url Inválida");
      }
    } catch (error) {
      console.error("Erro ao disparar a ação createVideo:", error);
    }

  }

  return (
    <C.Loading $loading={isLoading} data-message={Progress()}>
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
