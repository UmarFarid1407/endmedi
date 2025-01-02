import { IsString, IsEmail, IsEnum, IsInt, IsDate } from 'class-validator';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['admin', 'user', 'seller', 'pharmacist'], {
    message: 'Role must be one of: admin, user, pharmacist , seller',
  })
  role: string;

  @IsDate()
  createdAt: Date;
}
