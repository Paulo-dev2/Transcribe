import { useState, useCallback } from 'react';
// Importa os hooks useState e useCallback do React.
import { api } from '@/service/api';
// Importa a instância do cliente Axios 'api' do serviço de API.

export const useVideoDownload = () => {
  // Define um hook personalizado chamado useVideoDownload.

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Define um estado 'isLoading' para controlar se o download/criação está em andamento.

  const [transcript, setTranscript] = useState<object>({});
  // Define um estado 'transcript' para armazenar a transcrição do vídeo.

  const [success, setSuccess] = useState<boolean>(false);
  // Define um estado 'success' para indicar se a criação do vídeo foi bem-sucedida.

  const [error, setError] = useState<string | null>(null);
  // Define um estado 'error' para armazenar erros, se houver algum.

  const createVideo = useCallback(async (url: Object) => {
    // Define uma função chamada 'createVideo' para criar um vídeo a partir de uma URL.

    setIsLoading(true);
    // Define 'isLoading' como true para indicar que a criação está em andamento.
    setError(null);
    // Limpa qualquer erro anterior.

    try {
      const { data } = await api.post('/video/create-video', { data: url });
      // Faz uma solicitação POST para a rota '/video/create-video' com a URL do vídeo.

      if (data.transcript) {
        setTranscript(data.transcript);
        // Define 'transcript' com a transcrição do vídeo se a solicitação for bem-sucedida.
        setSuccess(true);
        // Define 'success' como true para indicar que a criação foi bem-sucedida.
      }
    } catch (err) {
      console.error(err);
      setError('Error');
      // Lida com erros, exibe um erro no console e define 'error' como 'Error'.
    } finally {
      setIsLoading(false);
      // Define 'isLoading' como false para indicar que a criação foi concluída.
    }
  }, []);

  return {
    isLoading,
    transcript,
    success,
    error,
    createVideo,
  };
  // Retorna um objeto que contém estados e funções relevantes para o download e criação de vídeos.
};
