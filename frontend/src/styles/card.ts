import styled from 'styled-components';

export const CardContainer = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
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

export const Thumbnail = styled.img`
  grid-area: thumbnail;
  width: 15vw;
  height: 15vh;
  margin: auto; /* Isso centraliza a imagem horizontalmente */
  display: block; /* Para centralizar a imagem verticalmente */
`;

export const InfoContainer = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column; /* Exibe os elementos em coluna */
  align-items: center;
`;

export const Title = styled.p`
  font-weight: bold;
  margin-bottom: 8px; /* Adicione um espaçamento inferior */
`;

export const URL = styled.p`
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  grid-area: buttons;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export const Button = styled.button<any>`
  background: ${props => props.deletar ? "red" : "#007bff"} ;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;
