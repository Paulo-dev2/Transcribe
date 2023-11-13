import { useState, useCallback } from 'react';
import { api } from '@/service/api';

export const useVideoSubtitle = () => {
  const [isSubtitling, setIsSubtitling] = useState<boolean>(false);
  const [isSubtitled, setIsSubtitled] = useState<boolean>(false);
  const [subtitleError, setSubtitleError] = useState<String | null>(null);

  const subtitleVideo = useCallback(async (id: string, videoUrl: string) => {
    setIsSubtitling(true);
    setSubtitleError(null);

    try {
      const { data } = await api.post('/video/subtitles-video', { data: { id, videoUrl } });
      if (data) {
        setIsSubtitled(true);
      }
    } catch (err) {
      console.error(err);
      setSubtitleError('Error');
    } finally {
        setIsSubtitling(false);
    }
  }, []);

  return {
    isSubtitling,
    isSubtitled,
    subtitleError,
    subtitleVideo,
  };
}
