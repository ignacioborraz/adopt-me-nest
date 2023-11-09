import { HttpException, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pet, PetsDocument } from './schema/pets.schema';
import { Model } from 'mongoose';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private PetModel: Model<PetsDocument>) { }
  async create(createPetDto: CreatePetDto) {
    try {
      let one = await this.PetModel.create(createPetDto)
      return one
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findAll(from: number, to: number) {
    try {
      let all = await this.PetModel.find().skip(from).limit(to)
      return all
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findOne(id: string) {
    try {
      let one = await this.PetModel.findById(id)
      return one
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    try {
      let one = await this.PetModel.findByIdAndUpdate(id, updatePetDto, { new: true })
      return one
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async remove(id: string) {
    try {
      let one = await this.PetModel.findByIdAndDelete(id)
      return one
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
