import { Request, Response } from 'express';
import { HttpRequest } from '../infra/ports/http';

export class adaptRoute {
  // Declaração da classe adaptRoute.

  static create(controller: any) {
    // Método estático que cria um adaptador para uma rota.

    return async (req: Request, res: Response) => {
      // Função assíncrona que lida com solicitações HTTP.

      const httpRequest: HttpRequest = {
        body: req.body.data,
        params: req.params,
      };
      // Cria um objeto HttpRequest com o corpo da solicitação e os parâmetros da rota.

      const httpResponse = await controller.handle(httpRequest);
      // Chama o controlador com o objeto HttpRequest e aguarda a resposta.

      res.status(httpResponse.statusCode).json(httpResponse.body);
      // Define o código de status da resposta e envia o corpo da resposta JSON.
    };
  }
}
