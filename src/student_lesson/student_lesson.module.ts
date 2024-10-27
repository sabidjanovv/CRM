import { Module } from '@nestjs/common';
import { StudentLessonService } from './student_lesson.service';
import { StudentLessonController } from './student_lesson.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [StudentLessonController],
  providers: [StudentLessonService],
})
export class StudentLessonModule {}
