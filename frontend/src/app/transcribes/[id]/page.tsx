"use client"

import { useVideo } from "@/hooks/get-video-by-id";
import { useEffect } from "react";
import { usePathname } from 'next/navigation'
import * as C from "@/styles";
import { View } from "@/components/View";
import { downloadTranscription } from "@/functions/main";
import { AlertType } from "@/components/Alert";

export default function DetailTranscribe(){
    const {isLoading,transcript,success,error,getVideoById} = useVideo();
    const pathname = usePathname()
    useEffect(() => {
        const getData = async () => {
            const id: any = pathname.split('/')[2];
            try {
                await getVideoById(id);
            } catch (error) {
                console.log(error)
            }
        }
        getData()
      }, [success]);

    return (
        <C.Loading $loading={isLoading} data-message="Carregando">
            {success && (
                <AlertType severity="success" title="Sucesso" message="Carregado com sucesso" />
           )}

           {success ? (
            <View
                success={success}
                transcription={transcript}
                downloadTranscription={downloadTranscription}
            />
           ): (
            <p>Carregando</p>
           )}
        </C.Loading>
    )
}