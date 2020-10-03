import { IsNotEmpty } from 'class-validator';

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
  gender: string;
}
