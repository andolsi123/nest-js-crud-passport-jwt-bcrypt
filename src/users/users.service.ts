import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.UserModel.find();
  }

  async findOne(id: any): Promise<User> {
    return await this.UserModel.findById({ _id: id });
  }

  async login(user: UserDto): Promise<any> {
    const myUser = await this.UserModel.findOne({ email: user.email });
    if (bcrypt.compare(myUser.password, user.password)) {
        const token = jwt.sign(myUser.toJSON(), 'HS256', {expiresIn: '7d'});
        return {
          access: true,
          message: 'access granted',
          access_token: token,
        };
    }
  }

  async createOne(user: UserDto): Promise<User> {
    const newUser = new this.UserModel(user);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return await newUser.save();
  }

  async updateOne(id: any, user: UserDto): Promise<User> {
    return this.UserModel.findByIdAndUpdate({ _id: id }, { $set: user });
  }

  async deleteOne(id: any): Promise<User> {
    return await this.UserModel.findByIdAndRemove({ _id: id });
  }

  async addItemToUser(id: any, idItem: any): Promise<User> {
    return await this.UserModel.findByIdAndUpdate(
      { _id: id },
      { $push: { items: idItem } },
    );
  }

  async findOneByToken(token: any): Promise<any> {
    return token;
  }
}
