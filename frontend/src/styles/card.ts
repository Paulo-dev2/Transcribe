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
  margin-bottom: 16px;
`;

export const InfoContainer = styled.div`
  grid-area: info;
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

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;