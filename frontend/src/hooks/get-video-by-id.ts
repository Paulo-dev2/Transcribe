import { useState, useCallback } from 'react';
import { api } from '@/service/api';

export const useVideoGet = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [video, setVideo] = useState();
  const [transcript, setTranscript] = useState<any>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<String | null>(null);

  const getVideoById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.get('/video/get-video/' + id);
      if (data) {
        const transcribe: any = data.transcript
        setVideo(data);
        setTranscript(transcribe);
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
    video,
    getVideoById,
  };
}
