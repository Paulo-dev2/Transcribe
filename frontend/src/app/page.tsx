"use client";
import {useState} from 'react';
import * as C from '@/styles'
import { useDispatch, useSelector  } from 'react-redux';
import { createVideo } from '@/redux/actions/video';
import VLibras from "vlibras-nextjs";

//import io from 'socket.io-client';

export default function Home() {
  const dispatch = useDispatch();
  const v = useSelector((state: any) => state.video);

  const [url, setUrl] = useState<string>("");
  const [notifications, setNotifications] = useState<any>({});
  const [success, setSuccess] = useState<Boolean>(false);


  const handleChangeUrl = ({value} : any) => setUrl(value);

  const formatTranscribe = (inputText: string) => {
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

    setNotifications(subtitles)
    setSuccess(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Disparar a ação createVideo e aguardar sua conclusão
      await dispatch(createVideo({ url }));
      console.log(v);
      if(v.success){
        let transcription = v.video
        alert("Ação createVideo despachada com sucesso!");
        formatTranscribe(transcription)
      }
    } catch (error) {
      console.error("Erro ao disparar a ação createVideo:", error);
    }

  }

  return (
    <C.AppContainer>
      <C.GridContainer>
        <C.LogoContainer>
          <img src="/logo.svg" alt="Logo" />
        </C.LogoContainer>
        <C.FlexContainer>
          <C.FormContainer>
            <C.InputWrapper className="input-wrapper flex">
              <C.SrOnly htmlFor="url">Cole a URL do YouTube aqui</C.SrOnly>
              <C.Input
                required
                type="url"
                name="url"
                id="url"
                onChange={({ target }) => handleChangeUrl(target)}
                placeholder="Cole a URL do YouTube aqui"
              />
              <C.CopyIcon className="ph ph-x-circle"></C.CopyIcon>
            </C.InputWrapper>
            <C.Button onClick={(e) => handleSubmit(e)}>Transcrever</C.Button>
          </C.FormContainer>
        </C.FlexContainer>
      </C.GridContainer>

      <C.MainContainer>
        <C.WrapperContainer className="wrapper grid">
          <C.VideoContainer className="video">
            <video id="youtubeVideo"></video>
          </C.VideoContainer>
          <C.FlexContainer className="transcription">
            <C.CopyButton className="copy">
              <C.CopyIcon className="ph ph-copy-simple"></C.CopyIcon>
            </C.CopyButton>
            <C.ContentWrapper className="content-wrapper">
              <C.ContentContainer className="content grid">
                <C.ChunkContainer className="chunk flex">
                  {success ? (
                    <>
                      {Object.keys(notifications).map((time) => (
                          <div >
                            <C.TimeContainer className="flex">{time}</C.TimeContainer>
                            <C.TextContainer>
                              {notifications[time].split('\n').map((line: any, index: any) => (
                                <span key={index}>{line}</span>
                              ))}
                            </C.TextContainer>
                          </div>
                      ))}
                    </>
                  ): (
                    <>
                  <C.TimeContainer className="flex">00:00</C.TimeContainer>
                    <C.TextContainer>
                      <span>Insira a URL</span>
                      <span>do youtube para</span>
                      <span>iniciar a transcrição</span>
                    </C.TextContainer>
                   </>
                  )}
                </C.ChunkContainer>
              </C.ContentContainer>
            </C.ContentWrapper>
          </C.FlexContainer>
        </C.WrapperContainer>
      </C.MainContainer>
      <VLibras forceOnload />
    </C.AppContainer>
  )
}
