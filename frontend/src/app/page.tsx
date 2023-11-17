"use client";

import * as C from "@/styles/index";
import { useVideoGetLastVideos } from "@/hooks/getLastVideos";
import youtube from "@/assets/images/youtube.png";
import wait from "@/assets/images/wait.png";
import ready from "@/assets/images/ready.png";
import transcrever from "@/assets/images/transcrever.png";
import Image from "next/image";

export default async function Home() {

  return (
    <C.AppContainer>
      <section style={{ padding: "1rem" }}>
        <C.MainContainer>
          <h1 style={{ fontWeight: "700", fontSize: "25px" }}>YouTube Transcription</h1>
          <span>
            O projeto é a tentativa do grupo de tornar a internet um lugar mais acessível 
            e conscientizar sobre o problema da falta de acessibilidade por meio da transcrição de vídeos do YouTube.
          </span>
        </C.MainContainer>
      </section>
      <section style={{ padding: "1rem" }}>
        <C.MainContainer>
          <h1 style={{ fontWeight: "700", fontSize: "25px" }}>Por que?</h1>
          <span>
            A busca de acessibilidade na internet não é somente uma prática
            recomendada para websites, app e etc. Afinal a internet é para todos
            e existe uma quantidade enorme de usuários que podem ter diferentes
            necessidades e deficiências. Portanto, a acessibilidade na web é uma
            responsabilidade essencial para garantir que todos,
            independentemente de suas limitações, possam acessar e utilizar os
            recursos online. E existe alguns aspectos que os desenvolvedores
            precisa adaptar, como: marcação semântica, texto alternativo,
            contraste de cores, navegabilidade, legendas e audidescrição e
            muitos outros. Pois de acordo com o site do Governo Federal, existem
            18,9 milhões de pessoas com deficiência na data 15/09/2023.
          </span>
        </C.MainContainer>
      </section>
      <section style={{ padding: "1rem" }}>
        <C.MainContainer>
          <h1 style={{ fontWeight: "700", fontSize: "25px" }}>Como usar?</h1>
          <section style={{ display: "flex", gap: "1rem" }}>
            <section
              style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
            >
              <li>Pegue o link do youtube</li>
              <Image
                style={{ marginBottom: "1rem" }}
                src={youtube}
                alt="youtube"
                width="500"
                height="500"
              />
            </section>
            <section
              style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
            >
              <li>Entre na aba transcrever</li>
              <Image
                style={{ marginBottom: "1rem" }}
                src={transcrever}
                alt="youtube"
                width="500"
                height="500"
              />
            </section>
            <section
              style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
            >
              <li>Cole, clique em transcrever e espere</li>
              <Image
                style={{ marginBottom: "1rem" }}
                src={wait}
                alt="youtube"
                width="500"
                height="500"
              />
            </section>
            <section
              style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
            >
              <li>A transcrição está pronta</li>
              <Image
                style={{ marginBottom: "1rem" }}
                src={ready}
                alt="youtube"
                width="500"
                height="500"
              />
            </section>
          </section>
        </C.MainContainer>
      </section>
    </C.AppContainer>
  );
}
