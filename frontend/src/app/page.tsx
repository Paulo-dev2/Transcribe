"use client";

import { useVideo } from '@/hooks/video';
import * as C from '@/styles/index'
import { Main } from '@/components/Home';
import { useState, useEffect } from 'react';

export default function Home() {

  const { isLoading, transcript, success, error, createVideo } = useVideo();
  const [url, setUrl] = useState<string>("");
  const [transcription, setTranscription] = useState<any>({});

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

  const formatTranscribe = async (inputText: string) => {
    const lines = inputText.split('\n');

    // Inicialize o dicionário
    const subtitles: any = {};

    // Variáveis para rastrear tempo e texto
    let currentTime = '';

    // Analise as linhas
    for (const line of lines) {
      if (line.includes('-->')) {
        // Esta linha contém informações de tempo
        const [startTime, endTime] = line.split(' --> ');
        currentTime = `${startTime} --> ${endTime}`;
      } else if (line.trim() !== '' && currentTime) {
        // Esta linha contém texto
        if (!subtitles[currentTime]) {
          subtitles[currentTime] = '';
        }
        subtitles[currentTime] += `${line} `;
      }
    }

    // Remova espaços em branco no início e no final de cada texto
    for (const key in subtitles) {
      subtitles[key] = subtitles[key].trim();
    }

    await setTranscription(subtitles);
  }

  const urlIsValid = (url: string) => {
    const tester = /^(https?|ftp):\/\/[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/
    return tester.test(url)
  }


  useEffect(() => {
    if (transcript && success) {
      formatTranscribe(transcript);
    }
  }, [transcript, success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (urlIsValid(url)) {
        await createVideo({ url });
        console.log(transcript);
        if (success) {
          await formatTranscribe(transcript)
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
    <C.AppContainer>
      <C.Loading $loading={isLoading} data-message="Baixando e transcrevendo">
        <Main
          handleChangeUrl={handleChangeUrl}
          handleSubmit={handleSubmit}
          success={success}
          transcription={transcription}
          url={url}
          downloadTranscription={downloadTranscription} />
      </C.Loading>
    </C.AppContainer>
  )
}
