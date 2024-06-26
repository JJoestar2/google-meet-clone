import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  create(user: Partial<User>): Promise<User> {
    const newUserDocument = new this.userModel(user);

    return newUserDocument.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel
    .find()
    .lean();
  }

  getByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).lean();
  }

  async getById(
    userId: string,
    projection: ProjectionType<User> | null = null,
    lean: boolean = true
  ): Promise<User> {
    const user = await this.userModel.findById(userId, projection).lean(lean);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    const user = this.userModel.findById(id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    this.userModel.deleteOne({ id });

    return user;
  }

  async getByEmailAndUpdateActivity(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) return null;

    const lastVisitedToday =
      user.lastActivity.toDateString() === new Date().toDateString();

    if (lastVisitedToday) return user.toObject();

    user.lastActivity = new Date();
    await user.save();

    return user.toObject();
  }
}
