import { IsString, IsEmail, IsEnum } from 'class-validator';

export class SignInData {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['admin', 'user', 'seller', 'pharmacist'], {
    message: 'Role must be one of: admin, user, pharmacist , seller',
  })
  role: string;
}
