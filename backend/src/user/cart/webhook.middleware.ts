import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    let rawBody = '';

    console.log('Request received at /webhook:', req.method, req.originalUrl);

    req.on('data', (chunk) => {
      rawBody += chunk;
    });

    req.on('end', () => {
      req.body = rawBody;
      console.log('Raw body received:', req.body);
      res.status(200).send('Webhook received');
      next();
    });
    next();
  }
}
