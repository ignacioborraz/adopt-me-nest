import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UsersDocument = HydratedDocument<User>

@Schema()
export class User {

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: "https://withthemetaverse.com/wp-content/uploads/2023/08/brand_img_AdoptMe.jpeg" })
  avatar: string;

}

export const UsersSchema = SchemaFactory.createForClass(User)