import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto, UpdateStudentDto } from './dto';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    return this.prismaService.students.create({ data: createStudentDto });
  }

  async findAll() {
    return this.prismaService.students.findMany({
      include: { lid: true,
      payments: true 
      }, 
    });
  }

  async findOne(id: number) {
    const student = await this.prismaService.students.findUnique({
      where: { id },
      include: { lid: true, payments: true }, 
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const existingStudent = await this.prismaService.students.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      throw new NotFoundException('Student not found');
    }

    return this.prismaService.students.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  async remove(id: number) {
    const existingStudent = await this.prismaService.students.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      throw new NotFoundException('Student not found');
    }

    return this.prismaService.students.delete({ where: { id } });
  }
}
