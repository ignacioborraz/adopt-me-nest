import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) { }

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    try {
      if (!createPetDto.name || !createPetDto.specie) {
        throw new HttpException("Incomplete request", HttpStatus.BAD_REQUEST)
      }
      let pet = this.petsService.create(createPetDto);
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
      let pets = this.petsService.findAll(from, to);
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
      let pet = this.petsService.findOne(id);
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
      let updatePetDto: UpdatePetDto = req.body
      let pet = this.petsService.update(id, updatePetDto);
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
      let pet = this.petsService.remove(id);
      if (pet) {
        return { statusCode: 200, response: pet }
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
