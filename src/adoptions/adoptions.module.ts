import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AdoptionsService } from './adoptions.service';
import { AdoptionsController } from './adoptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Adoption, AdoptionsSchema } from 'src/adoptions/schema/adoptions.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
      name: Adoption.name,
      schema: AdoptionsSchema
    }])
  ],
  controllers: [AdoptionsController],
  providers: [AdoptionsService],
})
export class AdoptionsModule {}
