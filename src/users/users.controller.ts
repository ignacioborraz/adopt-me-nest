import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomBytes } from "crypto"

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      if (!createUserDto.email || !createUserDto.password) {
        throw new HttpException("Incomplete request", HttpStatus.BAD_REQUEST)
      }
      let pet = this.usersService.create(createUserDto);
      return { statusCode: 201, response: pet }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get()
  findAll(@Query('limit') limit: number, @Query('page') page: number) {
    try {
      if (!limit) limit = 5
      if (!page) page = 1
      let from = (page - 1) * limit
      let to = from + Number(limit)
      let pets = this.usersService.findAll(from, to);
      if (pets.length > 0) {
        return { statusCode: 200, response: pets }
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      let pet = this.usersService.findOne(id);
      if (pet) {
        return { statusCode: 200, response: pet }
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Patch(':id')
  update(@Request() req) {
    try {
      let id = req.params.id
      let updatePetDto: UpdateUserDto = req.body
      let pet = this.usersService.update(id, updatePetDto);
      if (pet) {
        return { statusCode: 200, response: pet }
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      let pet = this.usersService.remove(id);
      if (pet) {
        return { statusCode: 200, response: pet }
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
