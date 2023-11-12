"use client";

import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

export const useAlert = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const setAlert = useCallback((severity: any, message: string ) => {
        enqueueSnackbar(message, {
            variant: severity,
            anchorOrigin: {
              vertical: "top", horizontal: "right"
            }
        });
    }, [enqueueSnackbar]);

    return {setAlert};
};
