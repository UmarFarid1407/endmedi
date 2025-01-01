import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { PrismaService } from 'src/prisma/prisma.service';
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
  controllers: [MedicineController],
  providers: [MedicineService, PrismaService, JwtAuthGuard, JwtStrategy],
})
export class MedicineModule {}
