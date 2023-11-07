import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { AdoptionsService } from './adoptions.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';

@Controller('adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Post()
  create(@Body() createAdoptionDto: CreateAdoptionDto) {
    try {
      if (!createAdoptionDto.pet || !createAdoptionDto.owner) {
        throw new HttpException("Incomplete request", HttpStatus.BAD_REQUEST)
      }
      let pet = this.adoptionsService.create(createAdoptionDto);
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
      let pets = this.adoptionsService.findAll(from, to);
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
      let pet = this.adoptionsService.findOne(id);
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
      let updateAdoptionDto: UpdateAdoptionDto = req.body
      let pet = this.adoptionsService.update(id, updateAdoptionDto);
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
      let pet = this.adoptionsService.remove(id);
      if (pet) {
        return { statusCode: 200, response: pet }
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
