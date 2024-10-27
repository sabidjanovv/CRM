import { IsNotEmpty, IsString } from "class-validator";

export class CreateStageDto {
  @IsString()
  @IsNotEmpty({ message: 'Please enter stage' })
  name: string;
}
