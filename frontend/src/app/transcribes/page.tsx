"use client"

import * as C from '@/styles/index';
import { useVideoGetAll } from "@/hooks/get-videos";
import { useVideoDelete } from "@/hooks/delete-video-by-id";
import { useEffect } from "react";
import { Card } from '@/components/Card';

import { useRouter } from 'next/navigation';
import { AlertType } from '@/components/Alert';
export default function Transcribes() {
    const {isLoading,transcript,success,getVideos} = useVideoGetAll();
    const {isDeleting, deletado, deleteVideoById} = useVideoDelete();
    const router = useRouter(); 
    useEffect(() => {
        const getData = async () => {
            try {
                await getVideos();
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
            if(deletado) location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <C.Loading  $loading={isLoading || isDeleting} data-message="Carregando">
           {success && (
                <AlertType severity="success" title="Sucesso" message="Carregados com sucesso" />
           )}
            <C.GridContainer>
                <C.FlexContainer>
                    {success && (
                        <>
                            {transcript.map( (data: any, index: number) => (
                                <Card 
                                    title={data.title}
                                    key={data._id}
                                    id={data._id}
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