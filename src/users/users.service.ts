import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity"
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  users: Array<User>
  constructor() {
    this.users = []
  }
  create(createUserDto: CreateUserDto) {
    try {
      createUserDto._id = randomBytes(12).toString("hex")
      this.users.push(createUserDto)
      return createUserDto
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  findAll(from: number, to: number) {
    try {
      if (this.users.length > 0) {
        return this.users.slice(from, to)
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  findOne(id: string) {
    try {
      let one = this.users.find(each => each._id === id)
      if (one) {
        return one
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let one = this.users.find(each => each._id === id)
      if (one) {
        for (let prop in updateUserDto) {
          one[prop] = updateUserDto[prop];
        }
        return one
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  remove(id: string) {
    try {
      let one = this.users.find(each => each._id === id)
      if (one) {
        this.users = this.users.filter(each => each._id !== id)
        return one
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
