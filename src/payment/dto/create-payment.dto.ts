import { IsBoolean, IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsInt({ message: 'Student ID must be an integer (e.g., 1, 2, 3).' })
  @IsNotEmpty({ message: 'Student ID is required and cannot be empty.' })
  student_id: number;

  @IsString({
    message: 'Payment last date must be a string (e.g., 2024-11-01).',
  })
  @IsNotEmpty({ message: 'Payment last date is required and cannot be empty.' })
  payment_last_date: string;

  @IsString({ message: 'Payment date must be a string (e.g., 2024-10-27).' })
  @IsNotEmpty({ message: 'Payment date is required and cannot be empty.' })
  payment_date: string;

  @IsInt({ message: 'Price must be a number (e.g., 100, 200).' })
  @IsNotEmpty({ message: 'Price is required and cannot be empty.' })
  price: number;

  @IsBoolean({ message: 'Is paid must be a boolean value (true or false).' })
  @IsNotEmpty({ message: 'Is paid status is required and cannot be empty.' })
  is_paid: boolean;

  @IsInt({ message: 'Total attendance must be an integer (e.g., 5, 10).' })
  @IsNotEmpty({ message: 'Total attendance is required and cannot be empty.' })
  total_attent: number;
}
