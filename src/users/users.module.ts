import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from './schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import IsValidEmail from '../middlewares/isValidEmail'
import CreateHash from '../middlewares/createHash'
import IsValidUser from '../middlewares/isValidUser'
import CreateToken from '../middlewares/createToken'
import IsUser from '../middlewares/isUser'
import ClearToken from 'src/middlewares/clearToken';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
      name: User.name,
      schema: UsersSchema
    }]),
    JwtModule.registerAsync({
      useFactory: () => ({ secret: process.env.SECRET_KEY })
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsValidEmail).forRoutes({
      path: 'auth/register',
      method: RequestMethod.POST
    })
    consumer.apply(CreateHash).forRoutes({
      path: 'auth/register',
      method: RequestMethod.POST
    })
    consumer.apply(IsValidUser).forRoutes({
      path: 'auth/login',
      method: RequestMethod.POST
    })
    consumer.apply(CreateToken).forRoutes({
      path: 'auth/login',
      method: RequestMethod.POST
    })
    consumer.apply(IsUser).forRoutes({
      path: 'auth/signout',
      method: RequestMethod.POST
    })
    consumer.apply(ClearToken).forRoutes({
      path: 'auth/signout',
      method: RequestMethod.POST
    })
  }
}
