"use client";
import {useState, useEffect} from 'react';
import * as C from '@/styles'
import { useDispatch, useSelector  } from 'react-redux';
import { createVideo } from '@/redux/actions/video';

//import io from 'socket.io-client';

export default function Home() {
  const dispatch = useDispatch();
  const video = useSelector((state: any) => state.video);

  const [url, setUrl] = useState<string>("");
  const [notifications, setNotifications] = useState<string>("");


  const handleChangeUrl = ({value} : any) => setUrl(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Disparar a ação createVideo e aguardar sua conclusão
      await dispatch(createVideo({ url }));
      console.log("Ação createVideo despachada com sucesso!");
    } catch (error) {
      console.error("Erro ao disparar a ação createVideo:", error);
    }
  }

  return (
    <C.AppContainer>
      <span>{notifications}</span>
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
                  <C.TimeContainer className="flex">00:00</C.TimeContainer>
                  <C.TextContainer>
                    <span>Insira a URL</span>
                    <span>do youtube para</span>
                    <span>iniciar a transcrição</span>
                  </C.TextContainer>
                </C.ChunkContainer>
              </C.ContentContainer>
            </C.ContentWrapper>
          </C.FlexContainer>
        </C.WrapperContainer>
      </C.MainContainer>
    </C.AppContainer>
  )
}
