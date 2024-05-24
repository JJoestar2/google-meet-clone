import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.userModel
    .find()
    .lean();
  }

  findOne(email: string) {
    const user = this.userModel
    .findOne({ email })
    .lean();

    if (!user) throw new NotFoundException(`User with email ${email} not found`);

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    const user = this.userModel.findById(id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    this.userModel.deleteOne({ id });
  }
}
