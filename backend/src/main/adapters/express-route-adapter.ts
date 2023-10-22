import { Request, Response } from 'express';
import { HttpRequest } from '@/presentation/ports/http';
 
export class adaptRoute {
  static create (controller: any){
      return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
          body: req.body,
          params: req.params,
          files: req.file || req.files
        }

        const httpResponse = await controller.handle(httpRequest);

        res.status(httpResponse.statusCode).json(httpResponse.body);
      }  
  } 
}