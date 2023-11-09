import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Pet } from "src/pets/schema/pets.schema";
import { User } from "src/users/schema/users.schema";

export type AdoptionsDocument = HydratedDocument<Adoption>

@Schema()
export class Adoption {

  @Prop({ type: Types.ObjectId, ref: "Pet" })
  pet: Pet;

  @Prop({ type: Types.ObjectId, ref: "User" })
  owner: User;

}

export const AdoptionsSchema = SchemaFactory.createForClass(Adoption)