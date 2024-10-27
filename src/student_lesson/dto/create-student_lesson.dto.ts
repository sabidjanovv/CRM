import {
  IsBoolean,
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateStudentLessonDto {
  @IsInt({ message: 'Lesson ID must be an integer (e.g., 1, 2, 3).' })
  @IsNotEmpty({ message: 'Lesson ID is required and cannot be empty.' })
  lesson_id: number;

  @IsInt({ message: 'Student ID must be an integer (e.g., 1, 2, 3).' })
  @IsNotEmpty({ message: 'Student ID is required and cannot be empty.' })
  student_id: number;

  @IsBoolean({ message: 'Is there must be a boolean value (true or false).' })
  @IsNotEmpty({
    message: 'Attendance status (is_there) is required and cannot be empty.',
  })
  is_there: boolean;

  @IsOptional()
  @IsString({
    message: 'Reason must be a string (e.g., "sick", "family emergency").',
  })
  reason?: string;

  @IsBoolean({ message: 'Be paid must be a boolean value (true or false).' })
  @IsNotEmpty({
    message: 'Payment status (be_paid) is required and cannot be empty.',
  })
  be_paid: boolean;
}
