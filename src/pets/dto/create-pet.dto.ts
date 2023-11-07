export class CreatePetDto {
  _id: string
  name: string;
  specie: string;
  birthDate: Date;
  adopted: boolean;
  image: string;
}
