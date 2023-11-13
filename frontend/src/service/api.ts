import axios from "axios";
// Importa a biblioteca Axios para fazer solicitações HTTP.

const baseURL = process.env.NEXT_PUBLIC_HOST;
// Obtém a URL base da variável de ambiente NEXT_PUBLIC_HOST.

export const api = axios.create({
    baseURL,
});
// Cria uma instância do cliente Axios chamada 'api' com a URL base definida.

