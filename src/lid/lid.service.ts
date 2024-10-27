import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLidDto, UpdateLidDto } from './dto';

@Injectable()
export class LidService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLidDto: CreateLidDto) {
    return this.prismaService.lid.create({ data: createLidDto });
  }

  async findAll() {
    return this.prismaService.lid.findMany({
      include: {
        stage: true,
        status: true,
        cancelReason: true,
        students: true,
      },
    });
  }

  async findOne(id: number) {
    const lid = await this.prismaService.lid.findUnique({
      where: { id },
      include: {
        stage: true,
        status: true,
        cancelReason: true,
        students: true,
      },
    });

    if (!lid) {
      throw new NotFoundException('Lid not found');
    }
    return lid;
  }

  async update(id: number, updateLidDto: UpdateLidDto) {
    return this.prismaService.lid.update({
      where: { id },
      data: updateLidDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.lid.delete({ where: { id } });
  }
}
