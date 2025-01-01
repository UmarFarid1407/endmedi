import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.register.service';
import { AuthService } from './user.login.service';
import { SignInData } from './user.signin.interface';
import { UserDto } from './UserDto';
import { UserDetailDto } from './profile/userDetails.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { RolesGuard } from '../guards/roles-guard';
import { Roles } from '../decorators/role.decorators';
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      role: string;
    },
  ) {
    try {
      const { name, email, password, role } = body;
      console.log(name, email, password, role);
      return await this.userService.createUser(name, email, password, role);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(@Body() signInData: SignInData) {
    try {
      const { email, password, role } = signInData;
      return this.authService.login(email, password, role);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('/allusers')
  async getAllUsers(): Promise<UserDto[]> {
    try {
      return this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('user', 'seller', 'pharmacist', 'admin')
  @Put('userdetail/:userID')
  async updateUserDetails(
    @Param('userID', ParseIntPipe) userID: number,
    @Body() userDetailDto: UserDetailDto,
  ) {
    try {
      return await this.userService.createUserDetails(userDetailDto, userID);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('user', 'seller', 'pharmacist', 'admin')
  @Get(':userID/profile')
  async getUserProfile(@Param('userID', ParseIntPipe) userID: number) {
    try {
      const profile = await this.userService.getUserProfile(userID);
      return { success: true, profile };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get('profiles')
  async getAllUserProfiles() {
    try {
      const profiles = await this.userService.getAllUserProfiles();
      return { success: true, profiles };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
