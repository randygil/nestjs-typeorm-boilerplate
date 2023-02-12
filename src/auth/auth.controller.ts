import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { Roles, UserStatus } from '../database/entities/user.entity';
import { LoginEmailDTO } from '../dto/validation/login-email';
import { hashWithAppKey } from '../utils';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDTO: LoginEmailDTO) {
    const { email, password } = loginDTO;
    try {
      const data = await this.authService.loginWithEmail(email, password);
      return { success: true, data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/register')
  async register() {
    await this.authService.register(
      {
        name: 'test',
        email: 'test@rafran.com',
        password: hashWithAppKey('12345'),
        role: Roles.ADMIN,
        status: UserStatus.ACTIVE,
      },
      {
        firstName: 'test',
        lastName: 'test',
        phone: '123456789',
      },
    );
    return { success: true };
  }
}
