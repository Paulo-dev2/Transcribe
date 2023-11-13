import { useSnackbar } from 'notistack';
// Importa o hook useSnackbar da biblioteca notistack.
import { useCallback } from 'react';
// Importa o hook useCallback do React.

export const useAlert = () => {
  // Define um hook personalizado chamado useAlert.

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // Obtém as funções enqueueSnackbar e closeSnackbar do hook useSnackbar.

  const setAlert = useCallback((severity: any, message: string ) => {
    // Define uma função chamada setAlert que aceita um nível de severidade (por exemplo, 'success', 'error') e uma mensagem.

    enqueueSnackbar(message, {
      variant: severity,
      anchorOrigin: {
        vertical: "top", horizontal: "right"
      }
    });
    // Chama a função enqueueSnackbar para exibir a notificação com a mensagem e configurações fornecidas.
  }, [enqueueSnackbar]);
  // O useCallback é usado para memoizar a função para evitar re-renderizações desnecessárias.

  return { setAlert };
  // Retorna um objeto que contém a função setAlert para ser usada no componente React.
};
