import { useState, useCallback } from "react";
// Importa os hooks useState e useCallback do React.
import { api } from "@/service/api";
// Importa a instância do cliente Axios 'api' do serviço de API.

export const useVideoGetAll = () => {
  // Define um hook personalizado chamado useVideoGetAll.

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Define um estado 'isLoading' para controlar se a obtenção de informações está em andamento.

  const [transcript, setTranscript] = useState<Array<object>>([]);
  // Define um estado 'transcript' para armazenar informações de vários vídeos.

  const [success, setSuccess] = useState<boolean>(false);
  // Define um estado 'success' para indicar se a obtenção de informações foi bem-sucedida.

  const [error, setError] = useState<string | null>(null);
  // Define um estado 'error' para armazenar erros, se houver algum.

  const getVideos = useCallback(async () => {
    // Define uma função chamada 'getVideos' para obter informações de todos os vídeos.

    setIsLoading(true);
    // Define 'isLoading' como true para indicar que a obtenção de informações está em andamento.
    setError(null);
    // Limpa qualquer erro anterior.

    try {
      const { data } = await api.get('/video/get-videos');
      // Faz uma solicitação GET para a rota '/video/get-videos' para obter informações de todos os vídeos.

      if (data.length > 0) {
        setSuccess(true);
        // Define 'success' como true se a solicitação for bem-sucedida.
        setTranscript(data);
        // Define 'transcript' com as informações dos vídeos.
      }
    } catch (err) {
      console.error(err);
      setError("Error");
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
    getVideos,
  };
  // Retorna um objeto que contém estados e funções relevantes para a obtenção de informações de todos os vídeos.
};
