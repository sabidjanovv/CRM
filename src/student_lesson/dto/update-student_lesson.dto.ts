import { PartialType } from '@nestjs/swagger';
import { CreateStudentLessonDto } from './create-student_lesson.dto';

export class UpdateStudentLessonDto extends PartialType(CreateStudentLessonDto) {}
