import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'Sardor' })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ example: 'sardorbek@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  readonly confirm_password: string;
}
