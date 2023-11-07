import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { Adoption } from "./entities/adoption.entity"
import { randomBytes } from 'crypto';

@Injectable()
export class AdoptionsService {
  adoptions: Array<Adoption>
  constructor() {
    this.adoptions = []
  }
  create(createAdoptionDto: CreateAdoptionDto) {
    try {
      createAdoptionDto._id = randomBytes(12).toString("hex")
      this.adoptions.push(createAdoptionDto)
      return createAdoptionDto
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  findAll(from: number, to: number) {
    try {
      if (this.adoptions.length > 0) {
        return this.adoptions.slice(from, to)
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  findOne(id: string) {
    try {
      let one = this.adoptions.find(each => each._id === id)
      if (one) {
        return one
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  update(id: string, updateAdoptionDto: UpdateAdoptionDto) {
    try {
      let one = this.adoptions.find(each => each._id === id)
      if (one) {
        for (let prop in updateAdoptionDto) {
          one[prop] = updateAdoptionDto[prop];
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
      let one = this.adoptions.find(each => each._id === id)
      if (one) {
        this.adoptions = this.adoptions.filter(each => each._id !== id)
        return one
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
