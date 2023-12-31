"use client";

import * as C from "@/styles/index";
import React from "react";
import Image from "next/image";

export const Header = ({ children }: any) => {
  return (
    <C.AppContainer>
      <C.Menu>
        <C.LogoContainer>
          <Image src="/logo.svg" alt="Logo" width="250" height="250" />
        </C.LogoContainer>
        <section>
          <C.Item>
            <C.ItemLink href="/transcribes">Transcrições</C.ItemLink>
          </C.Item>
          <C.Item>
            <C.ItemLink href="/transcribe">Transcrever</C.ItemLink>
          </C.Item>
          <C.Item>
            <C.ItemLink href="/">Home</C.ItemLink>
          </C.Item>
        </section>
      </C.Menu>

      {children}
    </C.AppContainer>
  );
};
