import styled, {css} from 'styled-components';

export const Menu = styled.ul`
  position: sticky;
  z-index: 100;
  top: 0;
  display: flex;
  padding: calc(4.5rem + 5vh) 5rem 0;
  width: 100%;
  list-style-type: none;
  margin: 0 0 1rem 0;
  padding: .5rem;
  overflow: hidden;
  background-color: rgba(14, 10, 10, 1);
  align-items: center;
  justify-content: space-between;
`;

export const Item = styled.li`
  float: right;
  padding: 1rem;
`;

export const ItemLink = styled.a`
  a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  &:hover {
    background-color: #111;
  }
`;

export const AppContainer = styled.div`
  // margin-top: 4.5rem;
  // padding: calc(4.5rem + 5vh) 5rem 0;
  width: 100%;
  height: auto;
  flex-direction: column;
`;

export const Link = styled.a`
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;

  &:hover {
    color: #535bf2;
  }
`;

export const GridContainer = styled.div`
  display: grid;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem para a próxima linha */
  justify-content: space-between; /* Distribui os itens uniformemente nas linhas */
  align-content: flex-start; /* Alinha as linhas no topo */
`;

export const LogoContainer = styled.div`
  text-align: center;
`;

export const SrOnly = styled.label`
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: absolute;
  margin: -1;
  padding: 0;
`;

export const ScrollbarThumb = styled.div`
  background-color: mediumpurple;
  border-radius: 999px;
`;

export const Scrollbar = styled.div`
  width: 6px;
`;

export const ScrollbarTrack = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
`;

export const CopyButton = styled.button`
  all: unset;
  display: flex;
  padding: 0.75rem;
  align-items: flex-start;
  gap: 0.5rem;
  position: absolute;
  right: 2.5rem;
  top: 2.5rem;
  border-radius: 0.5rem;
  background: var(--surface-secondary, #1F2937);

  &:hover {
    box-shadow: 4px 4px 24px 0px rgba(3, 7, 18, 0.60);
    cursor: pointer;
  }
`;

export const CopyIcon = styled.i`
  font-size: 1.5rem;

  animation: appear 400ms;

  @keyframes appear {
    from {
      opacity: 0;
    }
  }
`;

export const FormContainer = styled.form`
  // margin: 3rem auto 0;
  width: 100%;
  gap: 1rem;
  display: flex; // Adicione display flex para alinhar elementos em uma linha
  justify-content: center; // Centralize os elementos horizontalmente
  align-items: center; // Centralize os elementos verticalmente
`;

export const InputWrapper = styled.div`
  border-radius: 0.5rem;
  border: 2px solid var(--surface-secondary, #1F2937);
  background: var(--surface-primary, #111827);
  padding: 1rem;
  flex: 1;
  align-items: center;
`;

export const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  color: var(--text-primary, #F9FAFB);
  font-size: 1rem;
`;

export const Button = styled.button<any>`
  cursor: pointer;
  all: unset;
  border-radius: 0.5rem;
  background: ${props => props.salvar ? "green" : "var(--brand-primary, #9705EA)"} ;
  box-shadow: 0px 0px 16px 0px rgba(151, 5, 234, 0.50);
  min-width: 7rem;
  padding: 1.25rem 1.5rem;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-primary, #F9FAFB);
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    border-radius: 0.5rem;
    background: ${props => props.salvar ? "green" : "var(--brand-primary, #9705EA)"};
    box-shadow: 0px 0px 32px 0px #9705EA;
  }
`;

export const Loading = styled.div<{ $loading: boolean }>`
  ${({ $loading }) => $loading && css`
    &:before {
      content: attr(data-message);
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: grid;
      place-content: center;
      background-color: rgb(0 0 0 / 0.9);
      z-index: 100;
      color: white;
      font-size: 2rem;
      padding-inline: 25vw;
      box-sizing: border-box;
      text-align: center;
      animation: breathing 700ms infinite alternate cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  `}

  body {
    overflow: hidden;
  }
`;

export const MainContainer = styled.main`
  margin-top: 2.5rem;
  width: 100%;
  padding: 2.5rem;
  border-radius: 4rem 4rem 0rem 0rem;
  background: var(--surface-primary, #111827);
  flex: 1;
  position: relative;
`;

export const WrapperContainer = styled.div`
  gap: 2rem;
  overflow: hidden;
  grid-template-columns: 1fr 1fr;
`;

export const VideoContainer = styled.div`
  aspect-ratio: 16/9;
  border-radius: 2rem;
  background: var(--video-background, #000);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  height: calc(100% - 1.5rem);
  width: calc(100% - 3.5rem);
  overflow-y: auto;
  margin-top: 1.5rem;
`;

export const ContentContainer = styled.div`
  gap: 1rem;
  position: absolute;
  padding-right: 2rem;
  padding-bottom: 4rem;
`;

export const ChunkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TimeContainer = styled.time`
  display: flex;
  height: 1.5rem;
  padding: 0.25rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.25rem;
  background: var(--surface-secondary, #1F2937);
`;

export const TextContainer = styled.p`
  padding: 0.09rem 0.25rem;

  &:hover {
    border-radius: 0.25rem;
    background: var(--surface-tertiary, #374151);
  }

  span {
    color: var(--text-secondary, #E5E7EB);
    padding: .09rem;
  }

  span:hover {
    border-radius: 0.25rem;
    background: var
`;