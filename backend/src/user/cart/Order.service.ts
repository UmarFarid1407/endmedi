import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class OrderService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(
      'sk_test_51QSEck03bWGiW3VHMQBAJH2MHruKPIyqRZ7Lj11viHtg0vquqGxwZ6lZxs68f6ulv4UeHe8o6hjGN6j386i2HcE5000hQGrni8',
      {
        apiVersion: '2024-11-20.acacia',
      },
    );
  }

  async createCheckoutSession(
    cartItems,
    totalAmount,
  ): Promise<{ sessionId: string }> {
    try {
      if (!cartItems || cartItems.length === 0) {
        throw new Error('Cart is empty');
      }

      if (!totalAmount || totalAmount <= 0) {
        throw new Error('Total amount is missing or invalid');
      }

      const totalAmountInCents = Math.round(totalAmount * 100);

      const lineItems = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Cart Total',
            },
            unit_amount: totalAmountInCents,
          },
          quantity: 1,
        },
      ];

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:3000/throwuser?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:3000/throwuser',
      });

      return {
        sessionId: session.id,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
