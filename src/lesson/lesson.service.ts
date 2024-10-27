import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLessonDto: CreateLessonDto) {
    const existingGroup = await this.prismaService.group.findUnique({
      where: {
        id: createLessonDto.group_id,
      },
    });

    if (!existingGroup) {
      throw new Error(`Group with ID ${createLessonDto.group_id} does not exist.`);
    }

    const newLesson = await this.prismaService.lesson.create({
      data:{
        lesson_theme: createLessonDto.lesson_theme,
        lesson_number: createLessonDto.lesson_number,
        group_id: createLessonDto.group_id,
        lesson_date: createLessonDto.lesson_date,
      }
    })
    return newLesson;
  }

  async findAll() {
    const lessons = await this.prismaService.lesson.findMany({
      include: {
        group: true,
      },
    });
    return lessons;
  }

  async findOne(id: number) {
    const lesson = await this.prismaService.lesson.findUnique({
      where: { id },
      include: {
        group: true,
      },
    });
    if (!lesson) {
      throw new Error(`Lesson with ID ${id} does not exist.`);
    }
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.prismaService.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
    if (!lesson) {
      throw new Error(`Lesson with ID ${id} does not exist.`);
    }
    return lesson;
  }

  async remove(id: number) {
    const lesson = await this.prismaService.lesson.findUnique({
      where: { id },
    });
    if (!lesson) {
      throw new Error(`Lesson with ID ${id} does not exist.`);
    }
    await this.prismaService.lesson.delete({
      where: { id },
    });
    return `Lesson with ID ${id} has been deleted.`;
  }
}
