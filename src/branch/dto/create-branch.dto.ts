import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateBranchDto {
  @ApiProperty({ description: 'The name of the branch' })
  @IsString()
  @IsNotEmpty({ message: 'Please enter branch name' })
  readonly name: string;

  @ApiProperty({ description: 'The address of the branch' })
  @IsString()
  readonly address: string;

  @ApiProperty({
    description: 'The call number for the branch',
    example: '+998901234567', // Example format for a UZ phone number
  })
  @IsString()
  @IsNotEmpty({ message: 'Please enter a valid call number' })
  @IsPhoneNumber('UZ', {
    message: 'Please enter a valid phone number in UZ format',
  })
  readonly call_number: string;
}
