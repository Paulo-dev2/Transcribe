"use client"

import { useVideoGet } from "@/hooks/get-video-by-id";
import { useEffect } from "react";
import { usePathname } from 'next/navigation'
import * as C from "@/styles";
import { View } from "@/components/View";
import { downloadTranscription } from "@/functions/main";
import { AlertType } from "@/components/Alert";
import { useVideoUpdate } from "@/hooks/update-video-by-id";

export default function DetailTranscribe(){
    const {isLoading,transcript,success,getVideoById} = useVideoGet();
    const { isUpdating,upgraded,error,updateVideo,} = useVideoUpdate();
    const pathname = usePathname();

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

    const handleUpdate = async (id: string, transcript: object) => {
        try {
            await updateVideo(id, transcript);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <C.Loading $loading={isLoading || isUpdating} data-message="Carregando">
            {success && (
                <AlertType severity="success" title="Sucesso" message="Carregado com sucesso" />
           )}

            {upgraded && (
                <AlertType severity="success" title="Sucesso" message="Atualizado com sucesso" />
           )}

           {success ? (
            <View
                success={success}
                transcription={transcript}
                downloadTranscription={downloadTranscription}
                handleUpdate={handleUpdate}
            />
           ): (
            <p>Carregando</p>
           )}
        </C.Loading>
    )
}