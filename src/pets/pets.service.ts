import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from "./entities/pet.entity"
import { randomBytes } from 'crypto';

@Injectable()
export class PetsService {
  pets: Array<Pet>
  constructor() {
    this.pets = []
  }
  create(createPetDto: CreatePetDto) {
    try {
      createPetDto._id = randomBytes(12).toString("hex")
      this.pets.push(createPetDto)
      return createPetDto
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  findAll(from: number, to: number) {
    try {
      if (this.pets.length > 0) {
        return this.pets.slice(from, to)
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  findOne(id: string) {
    try {
      let one = this.pets.find(each => each._id === id)
      if (one) {
        return one
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  update(id: string, updatePetDto: UpdatePetDto) {
    try {
      let one = this.pets.find(each => each._id === id)
      if (one) {
        for (let prop in updatePetDto) {
          one[prop] = updatePetDto[prop];
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
      let one = this.pets.find(each => each._id === id)
      if (one) {
        this.pets = this.pets.filter(each => each._id !== id)
        return one
      }
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
