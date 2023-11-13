"use client"

import { useVideoGet } from "@/hooks/get-video-by-id";
import { useEffect } from "react";
import { usePathname } from 'next/navigation'
import * as C from "@/styles";
import { View } from "@/components/View";
import { downloadTranscription } from "@/functions/main";
import { useVideoUpdate } from "@/hooks/update-video-by-id";
import { useAlert } from '@/hooks/alert';
import { useVideoSubtitle } from "@/hooks/subtitles-video-by-id";
import { useRouter } from "next/navigation";

export default function DetailTranscribe(){
    const {setAlert} = useAlert();
    const router = useRouter()
    const {isLoading,transcript, video,success,getVideoById} = useVideoGet();
    const { isUpdating,upgraded,error,updateVideo} = useVideoUpdate();
    const { isSubtitling,isSubtitled,subtitleError,subtitleVideo,} = useVideoSubtitle()
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

    const handleSubtitle = async (id: string, videoUrl: string) => {
        try {
            await subtitleVideo(id, videoUrl);
            router.push(`/subtitles/${id}`)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <C.Loading $loading={isLoading || isUpdating || isSubtitling} data-message="Carregando">
           {success && (
            <View
                success={success}
                transcription={transcript}
                video={video}
                downloadTranscription={downloadTranscription}
                handleUpdate={handleUpdate}
                handleSubtitle={handleSubtitle}
            />
           )}
        </C.Loading>
    )
}