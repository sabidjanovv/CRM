import { Injectable } from '@nestjs/common';
import { CreateLidStatusDto, UpdateLidStatusDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LidStatusService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLidStatusDto: CreateLidStatusDto) {
    return await this.prismaService.lid_status.create({
      data: createLidStatusDto,
    });
  }

  async findAll() {
    return await this.prismaService.lid_status.findMany();
  }

  async findOne(id: number) {
    const lidStatus = await this.prismaService.lid_status.findUnique({
      where: { id },
    });
    if (!lidStatus) {
      throw new Error(`Lid status with ID ${id} not found`);
    }
    return lidStatus;
  }

  async update(id: number, updateLidStatusDto: UpdateLidStatusDto) {
    const lidStatus = await this.prismaService.lid_status.update({
      where: { id },
      data: updateLidStatusDto,
    });
    if (!lidStatus) {
      throw new Error(`Lid status with ID ${id} not found`);
    }
    return lidStatus;
  }

  async remove(id: number) {
    const lidStatus = await this.prismaService.lid_status.findUnique({
      where: { id },
    });
    if (!lidStatus) {
      throw new Error(`Lid status with ID ${id} not found`);
    }
    await this.prismaService.lid_status.delete({
      where: { id },
    });
    return {message:"Lid status removed successfully"};
  }
}
