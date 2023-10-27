"use client";
import * as C from '@/styles/index'
import VLibras from "vlibras-nextjs";
import { BsDownload } from 'react-icons/bs';
import { useState } from 'react';

export const Main = ({handleChangeUrl, handleSubmit, success, transcription, url, downloadTranscription}: any) => {
    const [disabled, setDisabled] = useState(true)
    return(
        <>
            <C.GridContainer>
            <C.LogoContainer>
            <img src="/logo.svg" alt="Logo" />
            </C.LogoContainer>
            <C.FlexContainer>
            <C.FormContainer>
                <C.InputWrapper className="input-wrapper flex">
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
                <C.Button onClick={(e) => handleSubmit(e)}>Transcrever</C.Button>
            </C.FormContainer>
            </C.FlexContainer>
        </C.GridContainer>

        <C.MainContainer>
            <C.WrapperContainer className="wrapper grid">
            <C.VideoContainer className="video">
                {success && (
                    <iframe
                        width="560"
                        height="315"
                        src={url.replace("watch?v=","embed/")}
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
                        <BsDownload onClick={() => downloadTranscription(transcription)}/>
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
                                <C.TimeContainer className="flex">{time}</C.TimeContainer>
                                <C.TextContainer>
                                {transcription[time].split('\n').map((line: any, index: any) => (
                                    <span key={index}>{line}</span>
                                ))}
                                </C.TextContainer>
                            </div>
                        ))}
                        </>
                    ): (
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