import { Module } from '@nestjs/common';
import { UserModule } from './user/auth/user.module';
import { MedicineModule } from './user/medicine/medicine.module';
import { CartModule } from './user/cart/cart.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    UserModule,
    MedicineModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
