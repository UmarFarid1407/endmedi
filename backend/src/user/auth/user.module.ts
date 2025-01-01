// src/user/user.module.ts

import { Module } from '@nestjs/common';
import { UserService } from './user.register.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from './user.login.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { JwtStrategy } from '../guards/jwt.strategy';
import { UploadController } from './userPicture.controller';
import { UploadService } from './userpicture.service';
@Module({
  imports: [
    JwtModule.register({
      secret: 'mw21ytre34#_4',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    UserService,
    PrismaService,
    AuthService,
    UploadService,
    JwtAuthGuard,
    JwtStrategy,
  ],
  controllers: [UserController, UploadController],
})
export class UserModule {}
