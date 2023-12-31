import { FaPlay } from 'react-icons/fa';
import { IoPlayBack, IoPlayForwardSharp } from 'react-icons/io5';
import styled from 'styled-components';

interface StyledProps {
  position?: string;
  top?: string;
  left?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  color?: string;
}

export const IndexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const ContainerWrapper = styled.div`
  height: 90vh;
  overflow: hidden;
  width: 1000vw;
`;

export const Container = styled.div`
  height: 90vh;
  position: relative;
  width: 100vw;
`;

export const OverlapWrapper = styled.div`
  height: 801px;
  position: relative;
`;

export const Overlap = styled.div`
  height: 942px;
  position: relative;
  top: 22px;
  width: 1840px;
`;

export const OverlapGroup = styled.div<StyledProps>`
  height: 942px;
  position: absolute;
  top: 0;
  width: 1832px;
  left: ${({ left }) => left || '0'};
`;

export const DivStylesLeftPanel = styled.div<StyledProps>`
  background-color: #111827;
  border-color: #dfe0e5;
  border-right-style: solid;
  border-right-width: 1px;
  height: 80vh;
  position: absolute;
  left: 5px;
  width: 29vw;
  border: 1px solid #ffffff;
  overflow-y: scroll; /* Adiciona uma barra de rolagem vertical conforme necessário */
  overflow-x: scroll;
`;


export const DivSubtitlesPanel = styled.div`
  border-radius: 4px;
  height: auto;
  overflow: hidden;
  width: 29vw;
`;

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Div = styled(FlexDiv)`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinhar itens à esquerda */
  padding: 10px; /* Espaçamento interno */
`;

export const TextBox = styled.div<StyledProps>`
  background-color: #caa7fd;
  border-radius: 8px;
  height: 39px;
  width: 2px;
  left: ${({ left }) => left || '9px'};
  display: flex;
  align-items: center; /* Centralizar verticalmente */
`;

export const TextStyled = styled.p<StyledProps>`
  color: #ffffde;
  font-family: 'Inter', Helvetica;
  font-size: 15px;
  font-weight: 400;
  left: 25px;
  letter-spacing: 0;
  line-height: 17px;
  position: relative;
  white-space: nowrap;
  width: 315px;
  top: -25px
`;

export const TextWrapper = styled.div`
  color: #5d647b;
  font-family: 'Inter', Helvetica;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 10px; /* Espaçamento entre os TextWrapper */
  left: 404px;
  letter-spacing: 0;
  line-height: 15px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: 51px;
  top: -50px
`;

export const DivEditStyled = styled.div`
  height: 769px;
  left: 30vw;
  position: absolute;
  top: 10px;
  width: 70vw;
`;

export const DivPreview = styled.div`
  height: 822px;
  left: 0px;
  position: absolute;
  top: 64px;
  width: 70vw;
`;

export const VideoContainer = styled.div`
  width: 100%;
  max-width: 70vw;
`;

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 70vw;
`;

export const Video = styled.video`
  width: 100%;
  height: auto;
`;

export const SubtitleOverlay = styled.div`
  position: absolute;
  bottom: 45px;
  width: calc(100% - 20px); /* ajuste conforme necessário */
  background: rgba(0, 0, 0, 0.1);
  color: white;
  text-align: center;
  padding: 10px;
`;

export const DivHeaderControls = styled.div`
  height: 64px;
  left: 0;
  position: absolute;
  top: 0;
  width: 70vw;
`;

export const InputWrapper = styled.div`
  height: 36px;
  left: 13px;
  position: relative;
  top: 32px;
  width: 20vw;
`;

export const Input = styled.input`
  border-radius: 8px;
  height: 36px;
  overflow: hidden;
  width: 117px;
`;

export const ProjectNameWrapper = styled.div`
  height: 20px;
  left: 10px;
  position: relative;
  width: 30vw;
`;

export const ProjectName = styled.span`
  background: transparent;
  border: none;
  font-family: 'Inter', Helvetica;
  font-size: 15px;
  font-weight: 400;
  height: 19px;
  left: 0;
  letter-spacing: 0;
  line-height: 20px;
  padding: 0;
  position: absolute;
  top: -1px;
  white-space: nowrap;
  width: 96px;
`;

export const StyledFaPlay = styled(FaPlay)`
  font-size: 24px; /* Ajuste o tamanho conforme necessário */
  margin-right: 10px; /* Espaçamento entre os ícones */
  margin-left: 10px; /* Espaçamento entre os ícones */
  cursor: pointer;
`;

export const StyledIoPlayForwardSharp = styled(IoPlayForwardSharp)`
  font-size: 24px; /* Ajuste o tamanho conforme necessário */
  margin-left: 10px; /* Espaçamento entre os ícones */
  cursor: pointer;
`;

export const StyledIoPlayBack = styled(IoPlayBack)`
  font-size: 24px; /* Ajuste o tamanho conforme necessário */
  margin-right: 10px; /* Espaçamento entre os ícones */
  cursor: pointer;
`;

export const StyledControlsContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* Garante que o contêiner ocupe a altura do pai */
`;
