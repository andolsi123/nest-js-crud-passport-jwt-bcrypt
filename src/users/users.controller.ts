import { Controller, Get, Post, Body, Param, UseGuards, Header, Req } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('getOne/:id')
  async getOne(@Param() param: any): Promise<User> {
    return this.userService.findOne(param.id);
  }

  @Post()
  async createOne(@Body() newUser: UserDto): Promise<User> {
    return this.userService.createOne(newUser);
  }

  @Post('updateOne/:id')
  async updateOne(@Param() param: any, @Body() user: UserDto): Promise<User> {
    return this.userService.updateOne(param.id, user);
  }

  @Post('deleteOne/:id')
  async deleteOne(@Param('id') id: any): Promise<User> {
    return this.userService.deleteOne(id);
  }

  @Post('addItem/:id/:idItem')
  @UseGuards(AuthGuard('bearer'))
  async pushItemToUser(
    @Param('id') id: any,
    @Param('idItem') idItem: any,
  ): Promise<User> {
    return this.userService.addItemToUser(id, idItem);
  }

  @Post('login')
  async login(@Body() user: UserDto): Promise<any> {
    return this.userService.login(user);
  }

  @Get('token')
  async getByToken(@Req() req: Request): Promise <any> {
    const token = (req.headers.authorization as string).split(' ')[1];
    const decoded = jwt.verify(token, 'HS256');
    return this.userService.findOneByToken(decoded);
  }
}
