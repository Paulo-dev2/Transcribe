"use client"

import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export const AlertType = ({ severity, title, message }: any) => {
  const [isVisible, setIsVisible] = useState(true);
  const duration = 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return isVisible ? (
    <div className={`alert-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity={severity}>
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Stack>
    </div>
  ) : null;
};
