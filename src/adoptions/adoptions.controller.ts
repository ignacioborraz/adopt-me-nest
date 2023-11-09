import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { AdoptionsService } from './adoptions.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { ConfigService } from '@nestjs/config';

@Controller('adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService, private config: ConfigService) { }

  @Post(":uid/:pid")
  async create(@Param("uid") uid: string, @Param("pid") pid: string) {
    try {
      let createAdoptionDto: CreateAdoptionDto = { owner: uid, pet: pid }
      let one = await this.adoptionsService.create(createAdoptionDto);
      return { statusCode: 201, response: one._id }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Get()
  async findAll(@Query('limit') limit: number, @Query('page') page: number) {
    try {
      if (!limit) limit = 5
      if (!page) page = 1
      let from = (page - 1) * limit
      let to = from + Number(limit)
      let all = await this.adoptionsService.findAll(from, to);
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
      let one = this.adoptionsService.findOne(id);
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
      let id = req.params.id
      let updateAdoptionDto: UpdateAdoptionDto = req.body
      let one = await this.adoptionsService.update(id, updateAdoptionDto);
      if (one) {
        return { statusCode: 200, updated: one._id }
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {

      throw new HttpException(error.message, error.status)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      let one = await this.adoptionsService.remove(id);
      if (one) {
        return { statusCode: 200, deleted: one._id }
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
