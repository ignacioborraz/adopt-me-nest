import { HttpException, Injectable } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Adoption, AdoptionsDocument } from './schema/adoptions.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdoptionsService {
  constructor(@InjectModel(Adoption.name) private AdoptionModel: Model<AdoptionsDocument>) { }
  async create(createAdoptionDto: CreateAdoptionDto) {
    try {
      let one = await this.AdoptionModel.create(createAdoptionDto)      
      return one
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findAll(from: number, to: number) {
    try {
      let all = await this.AdoptionModel.find().skip(from).limit(to)
      return all
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findOne(id: string) {
    try {
      let one = await this.AdoptionModel.findById(id)
      return one
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async update(id: string, updateAdoptionDto: UpdateAdoptionDto) {
    try {
      let one = await this.AdoptionModel.findByIdAndUpdate(id, updateAdoptionDto, { new: true })
      return one
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async remove(id: string) {
    try {
      let one = await this.AdoptionModel.findByIdAndDelete(id)
      return one
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
