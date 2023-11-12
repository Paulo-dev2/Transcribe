"use client"

import { SnackbarProvider } from 'notistack';

export default function Alert({children}: any){
    return (
    <SnackbarProvider
    maxSnack={3}
    autoHideDuration={3000}
  >
      {children}
  </SnackbarProvider>
    )
}