import { useState, useCallback } from 'react';
// Importa os hooks useState e useCallback do React.
import { api } from '@/service/api';
// Importa a instância do cliente Axios 'api' do serviço de API.

export const useVideoSubtitle = () => {
  // Define um hook personalizado chamado useVideoSubtitle.

  const [isSubtitling, setIsSubtitling] = useState<boolean>(false);
  // Define um estado 'isSubtitling' para controlar se a operação de legendagem está em andamento.

  const [isSubtitled, setIsSubtitled] = useState<boolean>(false);
  // Define um estado 'isSubtitled' para indicar se a legendagem foi concluída com sucesso.

  const [subtitleError, setSubtitleError] = useState<string | null>(null);
  // Define um estado 'subtitleError' para armazenar erros, se houver algum.

  const subtitleVideo = useCallback(async (id: string, videoUrl: string) => {
    // Define uma função chamada 'subtitleVideo' para adicionar legendas a um vídeo.

    setIsSubtitling(true);
    // Define 'isSubtitling' como true para indicar que a operação de legendagem está em andamento.
    setSubtitleError(null);
    // Limpa qualquer erro anterior.

    try {
      const { data } = await api.post('/video/subtitles-video', { data: { id, videoUrl } });
      // Faz uma solicitação POST para a rota '/video/subtitles-video' para adicionar legendas ao vídeo.

      if (data) {
        setIsSubtitled(true);
        // Define 'isSubtitled' como true se a operação for bem-sucedida.
      }
    } catch (err) {
      console.error(err);
      setSubtitleError('Error');
      // Lida com erros, exibe um erro no console e define 'subtitleError' como 'Error'.
    } finally {
      setIsSubtitling(false);
      // Define 'isSubtitling' como false para indicar que a operação de legendagem foi concluída.
    }
  }, []);

  return {
    isSubtitling,
    isSubtitled,
    subtitleError,
    subtitleVideo,
  };
  // Retorna um objeto que contém estados e funções relevantes para a operação de legendagem de vídeos.
}
