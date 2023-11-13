import { useState, useCallback } from 'react';
// Importa os hooks useState e useCallback do React.
import { api } from '@/service/api';
// Importa a instância do cliente Axios 'api' do serviço de API.

export const useVideoUpdate = () => {
  // Define um hook personalizado chamado useVideoUpdate.

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  // Define um estado 'isUpdating' para controlar se a operação de atualização está em andamento.

  const [upgraded, setUpgraded] = useState<boolean>(false);
  // Define um estado 'upgraded' para indicar se a atualização foi concluída com sucesso.

  const [error, setError] = useState<string | null>(null);
  // Define um estado 'error' para armazenar erros, se houver algum.

  const updateVideo = useCallback(async (id: string, transcript: object) => {
    // Define uma função chamada 'updateVideo' para atualizar informações de vídeo.

    setIsUpdating(true);
    // Define 'isUpdating' como true para indicar que a operação de atualização está em andamento.
    setError(null);
    // Limpa qualquer erro anterior.

    try {
      const { data } = await api.post('/video/update-video', { data: { id, transcript } });
      // Faz uma solicitação POST para a rota '/video/update-video' para atualizar as informações do vídeo.

      if (data) {
        setUpgraded(true);
        // Define 'upgraded' como true se a operação for bem-sucedida.
      }
    } catch (err) {
      console.error(err);
      setError('Error');
      // Lida com erros, exibe um erro no console e define 'error' como 'Error'.
    } finally {
      setIsUpdating(false);
      // Define 'isUpdating' como false para indicar que a operação de atualização foi concluída.
    }
  }, []);

  return {
    isUpdating,
    upgraded,
    error,
    updateVideo,
  };
  // Retorna um objeto que contém estados e funções relevantes para a operação de atualização de vídeos.
}
