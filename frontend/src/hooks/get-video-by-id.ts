import { useState, useCallback } from 'react';
// Importa os hooks useState e useCallback do React.
import { api } from '@/service/api';
// Importa a instância do cliente Axios 'api' do serviço de API.

export const useVideoGet = () => {
  // Define um hook personalizado chamado useVideoGet.

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Define um estado 'isLoading' para controlar se a obtenção de informações está em andamento.

  const [video, setVideo] = useState();
  // Define um estado 'video' para armazenar as informações do vídeo.

  const [transcript, setTranscript] = useState<any>();
  // Define um estado 'transcript' para armazenar a transcrição do vídeo.

  const [success, setSuccess] = useState<boolean>(false);
  // Define um estado 'success' para indicar se a obtenção de informações foi bem-sucedida.

  const [error, setError] = useState<string | null>(null);
  // Define um estado 'error' para armazenar erros, se houver algum.

  const getVideoById = useCallback(async (id: string) => {
    // Define uma função chamada 'getVideoById' para obter informações de um vídeo por ID.

    setIsLoading(true);
    // Define 'isLoading' como true para indicar que a obtenção de informações está em andamento.
    setError(null);
    // Limpa qualquer erro anterior.

    try {
      const { data } = await api.get('/video/get-video/' + id);
      // Faz uma solicitação GET para a rota '/video/get-video/' seguida do ID do vídeo.

      if (data) {
        const transcribe: any = data.transcript;
        setVideo(data);
        // Define 'video' com as informações do vídeo se a solicitação for bem-sucedida.
        setTranscript(transcribe);
        // Define 'transcript' com a transcrição do vídeo.
        setSuccess(true);
        // Define 'success' como true para indicar que a obtenção de informações foi bem-sucedida.
      }
    } catch (err) {
      console.error(err);
      setError('Error');
      // Lida com erros, exibe um erro no console e define 'error' como 'Error'.
    } finally {
      setIsLoading(false);
      // Define 'isLoading' como false para indicar que a obtenção de informações foi concluída.
    }
  }, []);

  return {
    isLoading,
    transcript,
    success,
    error,
    video,
    getVideoById,
  };
  // Retorna um objeto que contém estados e funções relevantes para a obtenção de informações de um vídeo.
};
