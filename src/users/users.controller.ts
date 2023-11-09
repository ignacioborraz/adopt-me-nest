import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService, private config: ConfigService) { }

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      if (!createUserDto.email || !createUserDto.password) {
        throw new HttpException("Incomplete request", HttpStatus.BAD_REQUEST)
      }
      let one = await this.usersService.create(createUserDto);
      return { statusCode: 201, response: one._id }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Post("login")
  async login() {
    try {
      return { statusCode: 200, response: "Logged in" }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Post("signout")
  async signout() {
    try {
      return { statusCode: 200, response: "Signed out" }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

}
