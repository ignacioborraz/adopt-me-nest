import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PetsDocument = HydratedDocument<Pet>

@Schema()
export class Pet {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  specie: string;

  @Prop({ default: false })
  adopted: boolean;

  @Prop({ default: new Date("2023-10-01") })
  birthDate: Date;

  @Prop({ default: "https://withthemetaverse.com/wp-content/uploads/2023/08/brand_img_AdoptMe.jpeg" })
  image: string;

}

export const PetsSchema = SchemaFactory.createForClass(Pet)