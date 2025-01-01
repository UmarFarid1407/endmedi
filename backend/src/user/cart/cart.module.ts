import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MedicineService } from '../medicine/medicine.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from './Order.service';
import { WebhookController } from './webHook.controller';
import { RawBodyMiddleware } from './webhook.middleware';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { JwtStrategy } from '../guards/jwt.strategy';
@Module({
  imports: [
    JwtModule.register({
      secret: 'mw21ytre34#_4',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CartController, WebhookController],
  providers: [
    CartService,
    PrismaService,
    MedicineService,
    OrderService,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class CartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes(WebhookController);
  }
}
