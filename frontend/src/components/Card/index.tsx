"use client"

import * as C from "@/styles/card"

export const Card = ({ id, url, key, onViewClick, onDeleteClick, title }: any) => {

    const getYouTubeThumbnail = (videoUrl: string, size='default')=> {
        const videoId = videoUrl.split('v=')[1];
        const thumbnailSize: any = {
            default: 'default.jpg',
            medium: 'mqdefault.jpg',
            high: 'hqdefault.jpg',
            maxres: 'maxresdefault.jpg',
        };
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailSize[size]}`;
        return thumbnailUrl;
    }

    return(
        <C.CardContainer key={key}>
            <C.Thumbnail src={getYouTubeThumbnail(url)}/>
            
            <C.InfoContainer>
                <C.Title>{title}</C.Title>
                <C.URL>{url}</C.URL>
            </C.InfoContainer>
            <C.ButtonContainer>
                <C.Button deletar onClick={() => onDeleteClick(id)}>Deletar</C.Button>
                <C.Button onClick={() => onViewClick(id)}>Visualizar</C.Button>
            </C.ButtonContainer>
        </C.CardContainer>
    )
}