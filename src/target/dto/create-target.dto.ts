import { IsNotEmpty, IsString } from "class-validator";

export class CreateTargetDto {
  @IsString()
  @IsNotEmpty({ message: 'Please enter stage' })
  name: string;
}
