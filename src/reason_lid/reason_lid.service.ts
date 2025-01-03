import { Injectable } from '@nestjs/common';
import { CreateReasonLidDto, UpdateReasonLidDto } from './dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReasonLidService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReasonLidDto: CreateReasonLidDto) {
    return await this.prismaService.reasonLid.create({
      data: createReasonLidDto,
    });
  }

  async findAll() {
    return await this.prismaService.reasonLid.findMany();
  }

  async findOne(id: number) {
    const reasonLid = await this.prismaService.reasonLid.findUnique({
      where: { id },
    });

    if (!reasonLid) {
      throw new Error(`ReasonLid with ID ${id} not found`);
    }
    return reasonLid;
  }

  async update(id: number, updateReasonLidDto: UpdateReasonLidDto) {
    const reasonLid = await this.prismaService.reasonLid.update({
      where: { id },
      data: updateReasonLidDto,
    });

    if (!reasonLid) {
      throw new Error(`ReasonLid with ID ${id} not found`);
    }
    return reasonLid;
  }

  async remove(id: number) {
    const reasonLid = await this.prismaService.reasonLid.findUnique({
      where: { id },
    });
    if (!reasonLid) {
      throw new Error(`ReasonLid with ID ${id} not found`);
    }
    await this.prismaService.reasonLid.delete({
      where: { id },
    });
    return { message: 'ReasonLid deleted successfully' };
  }
}
