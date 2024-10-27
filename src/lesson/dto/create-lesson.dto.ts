import { IsNotEmpty, IsString, IsBoolean, IsInt } from 'class-validator';

export class CreateLessonDto {
    @IsString()
    @IsNotEmpty({ message: 'Please enter lesson theme' })
    lesson_theme: string;

    @IsInt()
    @IsNotEmpty({ message: 'Please enter lesson number' })
    lesson_number: number;

    @IsInt()
    @IsNotEmpty({ message: 'Please enter lesson number' })
    group_id: number;

    @IsString()
    @IsNotEmpty({ message: 'Please enter lesson date(2024-11-01):' })
    lesson_date: string;
}