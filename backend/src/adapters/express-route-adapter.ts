import { Request, Response } from 'express';
import { HttpRequest } from '../infra/ports/http';
 
export class adaptRoute {
  static create (controller: any){
      return async (req: Request, res: Response) => {
        if(!req.body.data) return res.status(200).json({"error": "parametro data não informado"})
        const httpRequest: HttpRequest = {
          body: req.body.data,
          params: req.params,
        }

        const httpResponse = await controller.handle(httpRequest);

        res.status(httpResponse.statusCode).json(httpResponse.body);
      }  
  } 
}