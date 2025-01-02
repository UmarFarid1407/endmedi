import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { CartService } from './cart.service';
@Controller('webhook')
export class WebhookController {
  constructor(private readonly cartService: CartService) {}
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion,
  });

  @Post()
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    try {
      const sig = req.headers['stripe-signature'];
      if (!sig) {
        console.error('Stripe signature missing');
        return res.status(400).send('Webhook Error: Signature missing');
      }
      try {
        const event = this.stripe.webhooks.constructEvent(
          req.body,
          sig,
          'whsec_303b4d78a91667454ce617257ca4d26144d14e654ae0063f5e07b1f7b4f72a67',
        );

        if (event.type === 'checkout.session.completed') {
          const session = event.data.object as Stripe.Checkout.Session;
          if (session) {
            await this.cartService.getCartBySessionId(session.id);
          }
        }
      } catch (err) {
        console.error('❌ Error processing webhook:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
