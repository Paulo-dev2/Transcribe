import { useState, useCallback } from 'react';
import { api } from '@/service/api';

export const useVideoUpdate = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [upgraded, setUpgraded] = useState<boolean>(false);
  const [error, setError] = useState<String | null>(null);

  const updateVideo = useCallback(async (id: string, transcript: object) => {
    setIsUpdating(true);
    setError(null);

    try {
      const { data } = await api.post('/video/update-video', {data: {id,transcript}});
      if (data) {
        setUpgraded(true);
      }
    } catch (err) {
      console.error(err);
      setError('Error');
    } finally {
        setIsUpdating(false);
    }
  }, []);

  return {
    isUpdating,
    upgraded,
    error,
    updateVideo,
  };
}
