import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentLessonDto } from './dto/create-student_lesson.dto';

@Injectable()
export class StudentLessonService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentLessonDto: CreateStudentLessonDto) {
    return this.prisma.studentLesson.create({
      data: createStudentLessonDto,
    });
  }

  async findAll() {
    return this.prisma.studentLesson.findMany({
      include: { lesson: true, student: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.studentLesson.findUnique({
      where: { id },
      include: { lesson: true, student: true },
    });
  }

  async update(id: number, data: Partial<CreateStudentLessonDto>) {
    return this.prisma.studentLesson.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.studentLesson.delete({
      where: { id },
    });
  }
}
