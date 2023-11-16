"use client";
import { useEffect, useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import * as C from '@/styles/index';
import VLibras from "vlibras-nextjs";

type Transcription = Record<string, string[]>;

export const View = ({ handleSubtitle,video ,handleUpdate, success, transcription, downloadTranscription }: any) => {
  const [content, setContent] = useState<Transcription>();

    useEffect( () => {
        setContent({...transcription})
    }, [success])

  const handleInputChange = (event: React.ChangeEvent<HTMLSpanElement>, time: string, index: number) => {
    const newValue = event.target.textContent;
    setContent((prevContent) => {
      const newContent: any = { ...prevContent };
      if (newContent[time]) {
        newContent[time] = newValue || '';
      }
      return newContent;
    });
  };

  return (
    <>
      <C.MainContainer>
        <C.WrapperContainer className="wrapper grid">
          <C.VideoContainer className="video">
            {success && (
              <iframe
                width="560"
                height="315"
                src={video.url.replace("watch?v=", "embed/")}
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
                  <BsDownload onClick={() => downloadTranscription(content)} />
                </C.CopyIcon>
              )}
            </C.CopyButton>
            <C.ContentWrapper className="content-wrapper">
              <C.ContentContainer className="content grid">
                <C.ChunkContainer className="chunk flex">
                  {success && (
                     <>
                     {Object.keys(transcription).map((time) => (
                     <div key={time}>
                         <C.TimeContainer className="flex">{time}</C.TimeContainer>
                         <C.TextContainer>
                         {[(transcription[time])].map((text: string, index: number) => (
                             <span
                             key={index}
                             contentEditable={true}
                             onInput={(e: any) => handleInputChange(e, time, index)}
                             >
                             {text}
                             </span>
                         ))}
                         </C.TextContainer>
                     </div>
                     ))}
                 </>
                  )}
                </C.ChunkContainer>
              </C.ContentContainer>
            </C.ContentWrapper>
          </C.FlexContainer>
          <C.Button  onClick={ () => handleSubtitle(video._id, video.url)}>
            Legendar
          </C.Button>
          <C.Button salvar onClick={ () => handleUpdate(video._id, content)}>
            Salvar
          </C.Button>
        </C.WrapperContainer>
      </C.MainContainer>
      <VLibras forceOnload />
    </>
  );
};
