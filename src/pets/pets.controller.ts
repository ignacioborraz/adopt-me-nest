import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ConfigService } from '@nestjs/config';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService, private config: ConfigService) { }

  @Post()
  async create(@Body() createPetDto: CreatePetDto) {
    try {
      if (!createPetDto.name || !createPetDto.specie) {
        throw new HttpException("Incomplete request", HttpStatus.BAD_REQUEST)
      }
      let one = await this.petsService.create(createPetDto);
      return { statusCode: 201, response: one._id }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Get()
  async findAll(@Query('limit') limit: number, @Query('page') page: number) {
    try {
      console.log(this.config.get<string>("PORT"));
      if (!limit) limit = 5
      if (!page) page = 1
      let from = (page - 1) * limit
      let to = from + Number(limit)
      let all = await this.petsService.findAll(from, to);
      if (all.length > 0) {
        return { statusCode: 200, response: all }
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      let one = this.petsService.findOne(id);
      if (one) {
        return { statusCode: 200, response: one }
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Patch(':id')
  async update(@Request() req) {
    try {
      console.log(req);

      let id = req.params.id
      let updatePetDto: UpdatePetDto = req.body
      let one = await this.petsService.update(id, updatePetDto);
      if (one) {
        return { statusCode: 200, updated: one._id, req }
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {

      throw new HttpException(error.message, error.status)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      let one = await this.petsService.remove(id);
      if (one) {
        return { statusCode: 200, deleted: one._id }
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
