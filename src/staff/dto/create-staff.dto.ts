import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({ example: 'Sardor' })
  @IsString()
  @IsNotEmpty({ message: 'Please enter first name' })
  readonly first_name: string;

  @ApiProperty({ example: 'Sobidjonov' })
  @IsString()
  @IsNotEmpty({ message: 'Please enter last name' })
  readonly last_name: string;

  @ApiProperty({ example: '+998901234567' })
  @IsNotEmpty({ message: 'Please enter a phone number' })
  @IsPhoneNumber('UZ', { message: 'Please enter an UZ phone number' })
  readonly phone_number: string;

  @ApiProperty({ example: 'sardor@gmail.com' })
  @IsNotEmpty({ message: 'Please enter an email' })
  @IsString()
  readonly email: string;

  @ApiProperty({ example: 'sardorsobidjonov' })
  @IsNotEmpty({ message: 'Please enter a login' })
  @IsString()
  readonly login: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'Please enter a password' })
  @IsString()
  readonly password: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'Please confirm your password' })
  @IsString()
  readonly confirm_password: string;

  @IsNotEmpty({message: 'Please enter your role'})
  @IsString()
  role: string;
}