"use client";
import * as C from "@/styles/index";
import VLibras from "vlibras-nextjs";
import { BsDownload } from "react-icons/bs";

export const Main = ({
  handleChangeUrl,
  handleSubmit,
  success,
  transcription,
  url,
  downloadTranscription,
}: any) => {
  return (
    <>
      <C.GridContainer>
        <C.FlexContainer>
          <C.FormContainer>
            <section
              style={{
                width: "100%",
                padding: "1rem",
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <C.InputWrapper
                className="input-wrapper flex"
                style={{ maxWidth: "40%" }}
              >
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
              <C.Button
                onClick={(e: any) => handleSubmit(e)}
                style={{ width: "5%", textAlign: "center" }}
              >
                Transcrever
              </C.Button>
            </section>
          </C.FormContainer>
        </C.FlexContainer>
      </C.GridContainer>

      <section style={{ padding: "1rem" }}>
        <C.MainContainer>
          <C.WrapperContainer className="wrapper grid">
            <C.VideoContainer className="video">
              {success && (
                <iframe
                  width="560"
                  height="315"
                  src={url.replace("watch?v=", "embed/")}
                  title="YouTube Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}
            </C.VideoContainer>
            <C.FlexContainer className="transcription">
              <C.CopyButton className="copy">
                {success && (
                  <C.CopyIcon>
                    <BsDownload
                      onClick={() => downloadTranscription(transcription)}
                    />
                  </C.CopyIcon>
                )}
              </C.CopyButton>
              <C.ContentWrapper className="content-wrapper">
                <C.ContentContainer className="content grid">
                  <C.ChunkContainer className="chunk flex">
                    {success ? (
                      <>
                        {Object.keys(transcription).map((time) => (
                          <div key={time}>
                            <C.TimeContainer className="flex">
                              {time}
                            </C.TimeContainer>
                            <C.TextContainer>
                              {transcription[time]
                                .split("\n")
                                .map((line: any, index: any) => (
                                  <span key={index}>{line}</span>
                                ))}
                            </C.TextContainer>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        <C.TimeContainer className="flex">
                          00:00
                        </C.TimeContainer>
                        <C.TextContainer>
                          <span>Insira a URL do youtube parainiciar a transcrição</span>
                        </C.TextContainer>
                      </>
                    )}
                  </C.ChunkContainer>
                </C.ContentContainer>
              </C.ContentWrapper>
            </C.FlexContainer>
          </C.WrapperContainer>
        </C.MainContainer>
      </section>
      <VLibras forceOnload />
    </>
  );
};
