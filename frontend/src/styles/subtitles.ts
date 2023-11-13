import styled from 'styled-components';

export const Sidebar = styled.section`
  width: 20%;
  height: 80vh; /* Diminui a altura da barra lateral */
  position: fixed;
  left: 0;
  overflow-y: auto;
  padding: 20px;
`;

export const TranscriptionBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Reduz o espaço entre os blocos de transcrição */
  width: 80%; /* Aumenta a largura do bloco de transcrição */
  padding: 8px; /* Adiciona algum espaçamento interno */
  border: 1px solid #ccc;
  border-radius: 8px;
`;


export const MainSection = styled.section`
  margin-left: 20%; /* Considerando o espaço da sidebar */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100vh;
  padding-bottom: 20vh; /* Espaço para a legenda do vídeo */
`;

export const VideoContainer = styled.div`
  position: relative;
`;

export const Video = styled.video`
  width: 100%;
`;

export const SubtitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  padding: 10px;
`;

export const CardContainer = styled.div`
  border: 1px solid #ccc;
  width: 100%;
  max-width: calc((100% / 3) - 2rem);
  height: 20rem;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "thumbnail"
    "info"
    "buttons";
  text-align: center;
  align-items: center;
`;

// ... (as definições para Thumbnail, InfoContainer, Title, URL, ButtonContainer, Button)
