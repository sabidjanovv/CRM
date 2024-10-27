import { Injectable } from '@nestjs/common';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TargetService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTargetDto: CreateTargetDto) {
    const target = await this.prismaService.target.create({
      data: {
        name: createTargetDto.name,
      },
    });
    return target;
  }

  async findAll() {
    return await this.prismaService.target.findMany({
      include: { lids: true},
    });
  }

  async findOne(id: number) {
    const target = await this.prismaService.target.findUnique({
      where: { id },
      include: { lids: true },
    });
  }

  async update(id: number, updateTargetDto: UpdateTargetDto) {
    const target = await this.prismaService.target.update({
      where: { id },
      data: updateTargetDto,
    });
    return target;
  }

  async remove(id: number) {
    const target = await this.prismaService.target.delete({
      where: { id },
    });
    return target;
  }
}
