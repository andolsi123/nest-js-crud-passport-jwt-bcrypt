import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'HS256',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, HttpStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
