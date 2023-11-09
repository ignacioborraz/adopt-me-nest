import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UsersDocument } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UsersDocument>) { }
  async create(createUserDto: CreateUserDto) {
    try {
      let one = await this.UserModel.create(createUserDto)
      return one
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findAll(from: number, to: number) {
    try {
      let all = await this.UserModel.find().skip(from).limit(to)
      return all
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findOne(id: string) {
    try {
      let one = await this.UserModel.findById(id)
      return one
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findByEmail(email: string) {
    try {
      let one = await this.UserModel.findOne({ email })
      return one
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let one = await this.UserModel.findByIdAndUpdate(id, updateUserDto, { new: true })
      return one
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async remove(id: string) {
    try {
      let one = await this.UserModel.findByIdAndDelete(id)
      return one
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
