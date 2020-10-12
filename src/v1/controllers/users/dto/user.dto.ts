import { IsNotEmpty, IsIn } from 'class-validator';
import { UserGender } from '../user-gender';

export class UserDTO {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  birthdate: Date;

  @IsNotEmpty()
  @IsIn([UserGender.FEMALE, UserGender.MALE, UserGender.OTHER])
  gender: string;
}
