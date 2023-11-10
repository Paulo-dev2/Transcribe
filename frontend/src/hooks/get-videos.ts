import { useState, useCallback } from 'react';
import { api } from '@/service/api';

export const useVideoGetAll = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<Array<object>>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<String | null>(null);

  const getVideos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.get('/video/get-videos');
      if (data.length > 0) {
        setSuccess(true);
        setTranscript(data);
      }
    } catch (err) {
      console.error(err);
      setError('Error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    transcript,
    success,
    error,
    getVideos,
  };
}
