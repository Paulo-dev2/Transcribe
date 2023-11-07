import { useState, useCallback } from 'react';
import { api } from '@/service/api';

export const useVideoDelete = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deletado, setDeletado] = useState<boolean>(false);
  const [error, setError] = useState<String | null>(null);

  const deleteVideoById = useCallback(async (id: object) => {
    setIsDeleting(true);
    setError(null);

    try {
      const { data } = await api.post('/video/delete-video', {data: id});
      if (data) {
        setDeletado(true);
      }
    } catch (err) {
      console.error(err);
      setError('Error');
    } finally {
        setIsDeleting(false);
    }
  }, []);

  return {
    isDeleting,
    deletado,
    error,
    deleteVideoById,
  };
}
