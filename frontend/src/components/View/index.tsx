"use client";
import * as C from '@/styles/index'
import VLibras from "vlibras-nextjs";
import { BsDownload } from 'react-icons/bs';

export const View = ({ handleChangeUrl, handleSubmit, success, transcription, downloadTranscription }: any) => {
    return (
        <>
            <C.MainContainer>
                <C.WrapperContainer className="wrapper grid">
                    <C.VideoContainer className="video">
                        {success && (
                            <iframe
                                width="560"
                                height="315"
                                src={transcription.url.replace("watch?v=", "embed/")}
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
                                    <BsDownload onClick={() => downloadTranscription(transcription)} />
                                </C.CopyIcon>
                            )}
                        </C.CopyButton>
                        <C.ContentWrapper className="content-wrapper">
                            <C.ContentContainer className="content grid">
                                <C.ChunkContainer className="chunk flex">
                                    {success ? (
                                        <>
                                            {Object.entries(transcription.transcript).map(([time, text]: [string, any]) => (
                                                <div key={time}>
							                        <C.TimeContainer className="flex">{time}</C.TimeContainer>
                                                    <C.TextContainer>
                                                    {Object.values(text).map((line: any, lineIndex: any ) => (
                                                        <span key={lineIndex}>{line}</span>
                                                    ))}
                                                    </C.TextContainer>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <C.TimeContainer className="flex">00:00</C.TimeContainer>
                                            <C.TextContainer>
                                                <span>Insira a URL</span>
                                                <span>do youtube para</span>
                                                <span>iniciar a transcrição</span>
                                            </C.TextContainer>
                                        </>
                                    )}
                                </C.ChunkContainer>
                            </C.ContentContainer>
                        </C.ContentWrapper>
                    </C.FlexContainer>
                </C.WrapperContainer>
            </C.MainContainer>
            <VLibras forceOnload />
        </>
    )
}