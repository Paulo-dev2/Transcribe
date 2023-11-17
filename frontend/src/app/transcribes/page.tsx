"use client";

import * as C from "@/styles/index";
import { useVideoGetAll } from "@/hooks/get-videos";
import { useVideoDelete } from "@/hooks/delete-video-by-id";
import { useCallback, useEffect } from "react";
import { Card } from "@/components/Card";

import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/alert";

export default function Transcribes() {
  const { setAlert } = useAlert();
  const { isLoading, transcript, success, getVideos } = useVideoGetAll();
  const { isDeleting, deletado, deleteVideoById } = useVideoDelete();
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      try {
        await getVideos();
        if (success) setAlert("success", "Transcrições carregadas com sucesso");
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [success]);

  const onViewClick = useCallback(
    async (id: string) => {
      router.push(`/transcribes/${id}`);
    },
    [router]
  );

  const onDeleteClick = useCallback(
    async (id: string) => {
      try {
        await deleteVideoById({ id });
        if (deletado) location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    [deleteVideoById, deletado]
  );

  return (
    <C.Loading $loading={isLoading || isDeleting} data-message="Carregando">
      <C.GridContainer>
        <C.FlexContainer>
          {success && (
            <section
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                gap: "1rem",
                justifyContent: "center",
                padding: "1rem"
              }}
            >
              {transcript.map((data: any, index: number) => (
                <Card
                  title={data.title}
                  key={data._id}
                  id={data._id}
                  url={data.url}
                  onViewClick={onViewClick}
                  onDeleteClick={onDeleteClick}
                />
              ))}
            </section>
          )}
        </C.FlexContainer>
      </C.GridContainer>
    </C.Loading>
  );
}
