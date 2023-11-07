import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { AdoptionsModule } from './adoptions/adoptions.module';

@Module({
  imports: [UsersModule, PetsModule, AdoptionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
