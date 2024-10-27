import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsDateString,
  IsEnum,
} from 'class-validator';

export class CreateStudentDto {
  @IsInt()
  @IsNotEmpty({ message: "Lid ID bo'sh bo'lishi mumkin emas" })
  lid_id: number;

  @IsOptional()
  @IsDateString({}, { message: "To'lov sanasi noto'g'ri formatda" })
  payment_last_date?: string;

  @IsString()
  @IsNotEmpty({ message: 'Ism kiritilishi kerak' })
  first_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Familiya kiritilishi kerak' })
  last_name: string;

  @IsPhoneNumber(null, { message: "Telefon raqami noto'g'ri formatda" })
  phone_number: string;

  @IsDateString({}, { message: "Tug'ilgan sana noto'g'ri formatda" })
  birthday: string;

  @IsEnum(['male', 'female'], {
    message: "Gender faqat 'male' yoki 'female' bo'lishi kerak",
  })
  @IsNotEmpty({ message: 'Gender kiritilishi kerak' })
  gender: string;
}
