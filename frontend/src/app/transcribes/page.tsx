"use client"

import * as C from '@/styles/index';
import { useVideo } from "@/hooks/get-videos";
import { useVideoDelete } from "@/hooks/delete-video-by-id";
import { useEffect } from "react";
import { Card } from '@/components/Card';

import { useRouter } from 'next/navigation'

export default function Transcribes() {
    const {isLoading,transcript,success,getVideos} = useVideo();
    const {isDeleting, deletado, deleteVideoById} = useVideoDelete();
    const router = useRouter(); 
    useEffect(() => {
        const getData = async () => {
            try {
                await getVideos();
                if(success)
                    alert("Sucesso")
            } catch (error) {
                console.log(error)
            }
        }
        getData()
      }, [success]);

    const onViewClick = (id: string) => {
        router.push(`/transcribes/${id}`)
    }

    const onDeleteClick = async (id: string) => {
        try {
            await deleteVideoById({id});
            if(deletado){
                alert("Deletado com sucesso");
                router.refresh();
            }
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <C.Loading  $loading={isLoading} data-message="Selecionando videos">
                <C.GridContainer>
                    <C.FlexContainer>
                        {success && (
                            <>
                                {transcript.map( (data: any, index: number) => (
                                    <Card 
                                        key={data.id}
                                        id={data.id}
                                        url={data.url}
                                        onViewClick={onViewClick}
                                        onDeleteClick={onDeleteClick}
                                    />
                                ))}
                            </>
                        )}
                    </C.FlexContainer>
                </C.GridContainer>
        </C.Loading>
    )
}