import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty({ message: 'Please enter role' })
  readonly name: string;
}
