import { useEffect, useRef, useState } from 'react';
import * as C from '@/styles/subtitles';
import React from 'react';
import { formatSRT } from '@/functions/main';

export const Subtitles = ({ transcription, videoUrl, success }: any) => {
  // Referências para o vídeo e o elemento de legendas
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const subtitlesRef = useRef<HTMLDivElement | any>(null);

  // Estado para armazenar as legendas e seu estado de edição
  const [subtitles, setSubtitles] = useState<any[]>([]);
  let video: HTMLVideoElement | any;

  // Atualiza as legendas quando a transcrição é modificada
  useEffect(() => {
    const formattedSubtitles = formatSRT(transcription);
    setSubtitles(formattedSubtitles);
  }, [transcription]);

  // Event listener para atualizar as legendas com base no tempo do vídeo
  useEffect(() => {
    video = videoRef.current;
    const subtitlesElement: HTMLDivElement | null = subtitlesRef.current;

    if (video && subtitlesElement) {
      const handleTimeUpdate = () => {
        const currentTime = video.currentTime;

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

  // Event listeners para reprodução e pausa do vídeo
  useEffect(() => {
    video = videoRef.current;

    const handlePlay = () => {
      console.log('O vídeo está em reprodução');
    };

    const handlePause = () => {
      console.log('O vídeo está pausado');
    };

    if (video) {
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, [videoRef]);

  // Função para manipular a edição das legendas
  const handleInputChange = (event: React.ChangeEvent<HTMLSpanElement>, time: string, index: number) => {
    const newValue = event.target.textContent;

    setSubtitles((prevContent) => {
      const newContent = [...prevContent];

      if (newContent[index]) {
        newContent[index] = { ...newContent[index], [time]: newValue || '' };
      }

      return newContent;
    });
  };

  // Funções para controlar a reprodução do vídeo
  const handleControlVideoPlay = () => {
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  const handleControlVideoBack = () => {
    if (video && video.currentTime >= 5) {
      video.currentTime -= 5;
    } else if (video) {
      video.currentTime = 0;
    }
  };

  const handleControlVideoForwardSharp  = () => {
    if (video && video.currentTime < video.duration - 5) {
      video.currentTime += 5;
    } else if (video) {
      video.currentTime = video.duration;
    }
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
                                <C.TextStyled 
                                  fontSize="15"
                                  contentEditable={true}
                                  onInput={(e: any) => { handleInputChange(e, time, index)}}
                                >
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
                      <C.Video ref={videoRef} id="video">
                        <source src={videoUrl.videoUrl} type="video/mp4" />
                      </C.Video>
                      <C.SubtitleOverlay ref={subtitlesRef} id="subtitles"></C.SubtitleOverlay>
                    </C.VideoWrapper>
                    <C.StyledControlsContainer>
                    <C.StyledIoPlayBack onClick={handleControlVideoBack} />
                    <C.StyledFaPlay onClick={handleControlVideoPlay} />
                    <C.StyledIoPlayForwardSharp  onClick={handleControlVideoForwardSharp}/>
                    </C.StyledControlsContainer>
                  </C.VideoContainer>
                </C.DivPreview>
                <C.DivHeaderControls>
                  <C.InputWrapper>
                    <C.ProjectNameWrapper>
                      <C.ProjectName>{videoUrl.url}</C.ProjectName>
                    </C.ProjectNameWrapper>
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
