import { Controller, Get, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  async createToken(@Body() user: any): Promise <any> {
    return await this.authService.createToken(user);
  }
}
