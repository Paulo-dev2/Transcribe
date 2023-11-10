import { useState, useCallback } from 'react';
import { api } from '@/service/api';

export const useVideoDownload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<object>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<String | null>(null);

  const createVideo = useCallback(async (url: Object) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.post('/video/create-video', { data: url });
      if (data.transcript) {
        setTranscript(data.transcript);
        setSuccess(true);
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
    createVideo,
  };
}
