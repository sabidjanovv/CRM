import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty({message:"Please enter branch name"})
  readonly name: string;

  @IsString()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  readonly call_number: string;
}
