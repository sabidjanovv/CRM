import {
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  IsPhoneNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateLidDto {
  @IsString({ message: 'First name must be a string (e.g., John).' })
  @IsNotEmpty({ message: 'First name is required and cannot be empty.' })
  first_name: string;

  @IsString({ message: 'Last name must be a string (e.g., Doe).' })
  @IsNotEmpty({ message: 'Last name is required and cannot be empty.' })
  last_name: string;

  @IsPhoneNumber("UZ", {
    message: 'Phone number must be valid (e.g., +998901234567).',
  })
  @IsNotEmpty({ message: 'Phone number is required and cannot be empty.' })
  phone_number: string;

  @IsOptional()
  @IsInt({ message: 'Target ID must be a whole number (e.g., 1, 2, 3).' })
  target_id: number;

  @IsOptional()
  @IsInt({ message: 'Lid Stage ID must be an integer (e.g., 1, 2, 3).' })
  lid_stage_id: number;

  @IsOptional()
  @IsString({
    message: 'Test date must be a valid date string (e.g., 2024-10-27).',
  })
  test_date?: string;

  @IsOptional()
  @IsString({
    message:
      'Trial lesson date must be in the format YYYY-MM-DD (e.g., 2024-11-01).',
  })
  trial_lesson_date?: string;

  @IsOptional()
  @IsString({ message: 'Trial lesson time must be a string (e.g., 14:00).' })
  trial_lesson_time?: string;

  @IsOptional()
  @IsInt({ message: 'Trial lesson group ID must be a number (e.g., 1, 2, 3).' })
  trial_lesson_group_id?: number;

  @IsInt({
    message:
      'Lid status ID must be a valid integer (e.g., 1 for active, 0 for inactive).',
  })
  @IsNotEmpty({ message: 'Lid status ID is required and cannot be empty.' })
  lid_status_id: number;

  @IsOptional()
  @IsInt({ message: 'Cancel reason ID must be an integer (e.g., 1, 2, 3).' })
  cancel_reason_id?: number;
}
