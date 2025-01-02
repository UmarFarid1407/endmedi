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
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
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
