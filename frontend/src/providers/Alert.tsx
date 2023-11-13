"use client"

import { SnackbarProvider } from 'notistack';

export default function Alert({children}: any){
    return (
    <SnackbarProvider
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    maxSnack={3}
    autoHideDuration={3000}
  >
      {children}
  </SnackbarProvider>
    )
}