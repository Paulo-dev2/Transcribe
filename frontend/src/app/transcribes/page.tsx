"use client"

import * as C from '@/styles/index';
import { useVideo } from "@/hooks/get-videos";
import { useEffect } from "react";

export default function Transcribes() {
    const {isLoading,transcript,success,error,getVideos} = useVideo();

    useEffect(() => {
        const getData = async () => {
            try {
                await getVideos();
                if(success)
                    alert("Sucesso")
            } catch (error) {

            }
        }
        getData()
      }, [success]);


    return(
        <C.Loading  $loading={isLoading} data-message="Selecionando videos">
                <C.GridContainer>
                    <C.FlexContainer>
                        {success && (
                            <>
                                {transcript.map( (data: any, index: number) => (
                                    <div>
                                         <iframe
                                            width="560"
                                            height="315"
                                            src={data.url.replace("watch?v=", "embed/")}
                                            title="YouTube Video"
                                            frameBorder="0"
                                            allowFullScreen
                                        ></iframe>
                                        <>
                                            {Object.entries(data).map(([time, text]: [string, any]) => (
                                                <div key={index}>
                                                    <C.TextContainer>
                                                    {Object.values(text).map((line: any, lineIndex: any ) => (
                                                        <span key={lineIndex}>{line}</span>
                                                    ))}
                                                    </C.TextContainer>
                                                </div>
                                            ))}

                                        </>
                                    </div>
                                ))}
                            </>
                        )}
                    </C.FlexContainer>
                </C.GridContainer>
        </C.Loading>
    )
}