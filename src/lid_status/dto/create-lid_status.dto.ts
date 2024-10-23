import { IsNotEmpty, IsString } from "class-validator";

export class CreateLidStatusDto {
  @IsString()
  @IsNotEmpty({ message: 'Please enter lid status' })
  readonly status: string;
}
