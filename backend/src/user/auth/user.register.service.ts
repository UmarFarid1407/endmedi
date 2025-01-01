import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './UserDto';
import { UserDetailDto } from './profile/userDetails.dto';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    name: string,
    email: string,
    password: string,
    role: string,
  ) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error('Email already exists. Please use a different email.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });

      return { message: 'User created successfully', user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllUsers(): Promise<UserDto[]> {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      return users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      }));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async generateRandomId(
  //   min: number = 1000,
  //   max: number = 9999,
  // ): Promise<number> {
  //   const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
  //   return randomId;
  // }

  async createUserDetails(userDetailDto: UserDetailDto, userID: number) {
    try {
      const {
        firstName,
        middleName,
        lastName,
        gender,
        email,
        phoneNumber,
        password,
      } = userDetailDto;

      const hashedPassword = await bcrypt.hash(password, 10);
      const id = userID;

      const existingUser = await this.prisma.user.findUnique({
        where: { id: userID },
      });

      if (!existingUser) {
        throw new Error('User does not exist');
      }

      const newuser = await this.prisma.user.update({
        where: { id },
        data: {
          email,
          password: hashedPassword,
        },
      });

      let profile;

      const existingProfile = await this.prisma.profile.findUnique({
        where: { userId: userID },
      });

      if (existingProfile) {
        console.log('users exists');
        profile = await this.prisma.profile.update({
          where: { userId: userID },
          data: {
            firstName,
            middleName,
            lastName,
            gender,
            email,
            phoneNumber,
            password: hashedPassword,
            role: existingUser.role,
          },
        });
      } else {
        profile = await this.prisma.profile.create({
          data: {
            firstName,
            middleName,
            lastName,
            gender,
            email,
            phoneNumber,
            password: hashedPassword,
            userId: userID,
            role: existingUser.role,
          },
        });
        if (profile) {
          console.log('user upated ');
        }
      }

      return {
        user: newuser,
        profile,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserProfile(userID: number) {
    try {
      const profile = await this.prisma.profile.findFirst({
        where: {
          userId: userID,
        },
      });

      if (!profile) {
        throw new Error('Profile not found');
      }

      return profile;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllUserProfiles() {
    try {
      const profiles = await this.prisma.profile.findMany();

      if (profiles.length === 0) {
        throw new Error('No profiles found');
      }

      return profiles;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
