import { useEffect, useRef, useState } from 'react';
import * as C from '@/styles/subtitles';
import React from 'react';
import { formatSRT } from '@/functions/main';

export const Subtitles = ({ transcription, videoUrl, success }: any) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const subtitlesRef = useRef<HTMLDivElement | null>(null);
  const [subtitles, setSubtitles] = useState<any[]>([]);

  useEffect(() => {
    // Formatando as legendas SRT
    const formattedSubtitles = formatSRT(transcription);
    setSubtitles(formattedSubtitles);
  }, [transcription]);

  // ...

useEffect(() => {
  const video: HTMLVideoElement | null = videoRef.current;
  const subtitlesElement: HTMLDivElement | null = subtitlesRef.current;

  if (video && subtitlesElement) {
    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;

      // Verifique se subtitles é um array antes de usar o método find
      if (Array.isArray(subtitles)) {
        const currentSubtitle = subtitles.find(subtitle => {
          return currentTime >= subtitle.startTime && currentTime <= subtitle.endTime;
        });

        if (currentSubtitle) {
          subtitlesElement.textContent = currentSubtitle.text;
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }
}, [subtitles, videoRef]);

// ...


const handleInputChange = (event: React.ChangeEvent<HTMLSpanElement>, time: string, index: number) => {
  const newValue = event.target.textContent;

  // Atualize o estado mantendo as legendas como um array de objetos
  setSubtitles((prevContent) => {
    const newContent = [...prevContent]; // Copie o array de legendas existente

    // Atualize o objeto de legenda na posição index
    if (newContent[index]) {
      newContent[index] = { ...newContent[index], [time]: newValue || '' }; // Mantenha as legendas como um objeto
    }

    return newContent;
  });
};

  return (
    <C.IndexContainer>
      <C.ContainerWrapper>
        <C.Container>
          <C.OverlapWrapper>
            <C.Overlap>
              <C.OverlapGroup>
                <C.DivStylesLeftPanel>
                  <C.DivSubtitlesPanel>
                    {success && (
                      <C.Div>
                        {Object.keys(transcription).map((time) => (
                          <React.Fragment key={time}>
                            <C.TextBox />
                            {[transcription[time]].map((text: string, index: number) => (
                              <React.Fragment key={index}>
                                <C.TextStyled fontSize="15" contentEditable={true} onInput={(e: any) => handleInputChange(e, time, index)}>
                                  {text}
                                </C.TextStyled>
                                <C.TextWrapper>{time.split('-->')[0]}</C.TextWrapper>
                                <C.TextWrapper>{time.split('-->')[1]}</C.TextWrapper>
                              </React.Fragment>
                            ))}
                          </React.Fragment>
                        ))}
                      </C.Div>
                    )}
                  </C.DivSubtitlesPanel>
                </C.DivStylesLeftPanel>
              </C.OverlapGroup>
              <C.DivEditStyled>
                <C.DivPreview>
                  <C.VideoContainer>
                    <C.VideoWrapper>
                      <C.Video ref={videoRef} controls>
                        <source src={videoUrl.videoUrl} type="video/mp4" />
                      </C.Video>
                      <C.SubtitleOverlay ref={subtitlesRef} id="subtitles"></C.SubtitleOverlay>
                    </C.VideoWrapper>
                  </C.VideoContainer>
                </C.DivPreview>
                <C.DivHeaderControls>
                  <C.InputWrapper>
                    <C.ProjectNameWrapper>{videoUrl.url}</C.ProjectNameWrapper>
                  </C.InputWrapper>
                </C.DivHeaderControls>
              </C.DivEditStyled>
            </C.Overlap>
          </C.OverlapWrapper>
        </C.Container>
      </C.ContainerWrapper>
    </C.IndexContainer>
  );
};
