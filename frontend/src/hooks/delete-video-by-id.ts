import { useState, useCallback } from 'react';
// Importa os hooks useState e useCallback do React.
import { api } from '@/service/api';
// Importa a instância do cliente Axios 'api' do serviço de API.

export const useVideoDelete = () => {
  // Define um hook personalizado chamado useVideoDelete.

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  // Define um estado 'isDeleting' para controlar se a exclusão está em andamento.

  const [deletado, setDeletado] = useState<boolean>(false);
  // Define um estado 'deletado' para indicar se o vídeo foi excluído com sucesso.

  const [error, setError] = useState<string | null>(null);
  // Define um estado 'error' para armazenar erros, se houver algum.

  const deleteVideoById = useCallback(async (id: object) => {
    // Define uma função chamada 'deleteVideoById' para excluir um vídeo por ID.

    setIsDeleting(true);
    // Define 'isDeleting' como true para indicar que a exclusão está em andamento.
    setError(null);
    // Limpa qualquer erro anterior.

    try {
      const { data } = await api.post('/video/delete-video', { data: id });
      // Faz uma solicitação POST para a rota '/video/delete-video' com o ID do vídeo.

      if (data) {
        setDeletado(true);
        // Define 'deletado' como true se a solicitação for bem-sucedida.
      }
    } catch (err) {
      console.error(err);
      setError('Error');
      // Lida com erros, exibe um erro no console e define 'error' como 'Error'.
    } finally {
      setIsDeleting(false);
      // Define 'isDeleting' como false para indicar que a exclusão foi concluída.
    }
  }, []);

  return {
    isDeleting,
    deletado,
    error,
    deleteVideoById,
  };
  // Retorna um objeto que contém estados e funções relevantes para a exclusão de vídeos.
};
