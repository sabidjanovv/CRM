import { IsNotEmpty, IsString } from "class-validator";

export class CreateLidStatusDto {
  @IsString({ message: "Lid Status must be a string"})
  @IsNotEmpty({ message: 'Please enter lid status' })
  readonly status: string;
}
