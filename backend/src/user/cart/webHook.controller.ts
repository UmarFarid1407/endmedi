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
  private stripe = new Stripe(
    'sk_test_51QSEck03bWGiW3VHMQBAJH2MHruKPIyqRZ7Lj11viHtg0vquqGxwZ6lZxs68f6ulv4UeHe8o6hjGN6j386i2HcE5000hQGrni8',
    {
      apiVersion: '2024-11-20.acacia',
    },
  );

  @Post()
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    try {
      console.log('Webhook controller received data');
      res.status(200).send('Webhook received');
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
        // console.log('✅ Event received:', event);
        // console.log('✅ Webhook received:', event.type);

        // console.log('✅ sig received:', sig);

        if (event.type === 'checkout.session.completed') {
          const session = event.data.object as Stripe.Checkout.Session;
          console.log('✅ Session ID:', session.id);
          console.log('✅ Payment Intent ID:', session.payment_intent);
          console.log('✅ Amount Total:', session.amount_total);
          console.log('✅ Currency:', session.currency);

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
