import { formatSRT } from '@/functions/main';
import * as C from '@/styles/subtitles';
import {TimeContainer, TextContainer} from "@/styles/index"
import { useEffect, useRef, useState } from 'react';

export const Subtitles = ({transcription, videoUrl, id, success}: any) => {

    const videoRef = useRef(null);
    const [subtitles, setSubtitles] = useState<any>([]);
    const [subtitlesElement, setSubtitlesElement] = useState<any>(null);
  
    useEffect(() => {
      setSubtitles(formatSRT(transcription));
      setSubtitlesElement(document.getElementById('subtitles'));
    }, [transcription]);

    useEffect(() => {
      if (subtitlesElement) {
        const video: any = videoRef.current;

        video.addEventListener('timeupdate', () => {
          const currentTime = video.currentTime;
          
          for (const subtitle of subtitles) {
            if (currentTime >= subtitle.startTime && currentTime <= subtitle.endTime) {
              subtitlesElement.textContent = subtitle.text;
              break;
            }
          }
        });
      }
    }, []);



    return(
      <>
      <C.Sidebar>
        {success && (
          <>
            {Object.keys(transcription).map((time) => (
              <C.TranscriptionBlock key={time}>
                <TimeContainer className="flex">{time}</TimeContainer>
                <TextContainer>
                  {[(transcription[time])].map((text: string, index: number) => (
                    <span key={index} contentEditable={true}>
                      {text}
                    </span>
                  ))}
                </TextContainer>
              </C.TranscriptionBlock>
            ))}
          </>
        )}
      </C.Sidebar>
    
      <C.MainSection>
        <C.VideoContainer>
          <C.Video ref={videoRef} controls onLoadedMetadata={() => {
            const video: any = videoRef.current;
            video.addEventListener('timeupdate', () => {
              const currentTime = video.currentTime;
              for (const subtitle of subtitles) {
                if (currentTime >= subtitle.startTime && currentTime <= subtitle.endTime) {
                  subtitlesElement.textContent = subtitle.text;
                  break;
                }
              }
            });
          }}>
            <source src={videoUrl.videoUrl} type="video/mp4" />
          </C.Video>
          <C.SubtitleOverlay id="subtitles" className="subtitles"></C.SubtitleOverlay>
        </C.VideoContainer>
      </C.MainSection>
    </>
    
    )
}