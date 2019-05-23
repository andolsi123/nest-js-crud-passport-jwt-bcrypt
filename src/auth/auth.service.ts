import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(token: string): Promise<any> {
    return await this.usersService.findOneByToken(token);
  }

  async createToken(user: any): Promise<any> {
    const token = this.jwtService.sign(user);
    return {
      access: true,
      message: 'access granted',
      access_token: token,
    };
  }
}
