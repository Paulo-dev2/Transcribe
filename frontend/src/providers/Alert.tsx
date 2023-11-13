"use client"

import { SnackbarProvider } from 'notistack';
// Importa o componente SnackbarProvider da biblioteca notistack.

export default function Alert({ children }: any) {
  // Define um componente funcional chamado Alert que recebe 'children' como propriedade.

  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      maxSnack={3}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
  // Renderiza o componente SnackbarProvider com algumas configurações e renderiza os filhos (children) dentro dele.
}
