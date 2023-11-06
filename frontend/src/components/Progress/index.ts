import eventBus from '@/functions/eventBus';
import { useEffect, useState } from 'react';

const Progress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onProgress = (data: number) => {
      setProgress(data);
    };

    eventBus.on('progress', onProgress);

    return () => {
      eventBus.off('progress', onProgress);
    };
  }, []);

  console.log(progress);

  return `Progresso do download: ${progress}%`;
};

export default Progress;
