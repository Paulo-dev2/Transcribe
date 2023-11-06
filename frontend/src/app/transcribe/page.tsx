"use client";

import { useVideo } from '@/hooks/download-video';
import * as C from '@/styles/index';
import { Main } from '@/components/Home';
import { useState } from 'react';
import Progress from '@/components/Progress';

export default function Transcribe() {

  const { isLoading, transcript, success, error, createVideo } = useVideo();
  const [url, setUrl] = useState<string>("");

  const handleChangeUrl = ({ value }: any) => setUrl(value);

  const generateTextFile = (transcription: any) => {
    const text = Object.keys(transcription)
      .map(time => `${time}\n${transcription[time]}`)
      .join('\n\n')

    return new Blob([text], { type: 'text/plain' })
  }

  const downloadTranscription = (transcription: any) => {
    const blob = generateTextFile(transcription);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'transcription.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  
  const urlIsValid = (url: string) => {
    const tester = /^(https?|ftp):\/\/[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/
    return tester.test(url)
  }

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
