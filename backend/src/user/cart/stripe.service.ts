// import { Injectable } from '@nestjs/common';
// import Stripe from 'stripe';

// @Injectable()
// export class StripeService {
//   private stripe = new Stripe(
//     'sk_test_51QSEck03bWGiW3VHMQBAJH2MHruKPIyqRZ7Lj11viHtg0vquqGxwZ6lZxs68f6ulv4UeHe8o6hjGN6j386i2HcE5000hQGrni8',
//     {
//       apiVersion: '2024-11-20.acacia',
//     },
//   );

//   // Method to construct the event
//   constructEvent(body: string, sig: string, secret: string) {
//     return this.stripe.webhooks.constructEvent(body, sig, secret);
//   }
// }
