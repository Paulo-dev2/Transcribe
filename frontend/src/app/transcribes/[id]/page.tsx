"use client"

import { useVideoGet } from "@/hooks/get-video-by-id";
import { useEffect } from "react";
import { usePathname } from 'next/navigation'
import * as C from "@/styles";
import { View } from "@/components/View";
import { downloadTranscription } from "@/functions/main";
import { useVideoUpdate } from "@/hooks/update-video-by-id";
import { useAlert } from '@/hooks/alert';

export default function DetailTranscribe(){
    const {setAlert} = useAlert();
    const {isLoading,transcript,success,getVideoById} = useVideoGet();
    const { isUpdating,upgraded,error,updateVideo,} = useVideoUpdate();
    const pathname = usePathname();

    useEffect(() => {
        const getData = async () => {
            const id: any = pathname.split('/')[2];
            try {
                await getVideoById(id);
                if(success)
                    setAlert("success", "Carregado com sucesso")
            } catch (error) {
                setAlert("error", "Aconteceu algum erro, tente novamente")
            }
        }
        getData()
      }, [success]);

    const handleUpdate = async (id: string, transcript: object) => {
        try {
            await updateVideo(id, transcript);
            setAlert("success", "Atualizado com sucesso")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <C.Loading $loading={isLoading || isUpdating} data-message="Carregando">
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