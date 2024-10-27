import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @IsString({message:"Role must be a string not number"})
  @IsNotEmpty({ message: 'Please enter role' })
  name: string;
}
