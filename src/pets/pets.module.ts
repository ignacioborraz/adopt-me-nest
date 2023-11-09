import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetsSchema } from './schema/pets.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
      name: Pet.name, schema: PetsSchema
    }])
  ],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule { }
