import { Injectable } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StageService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createStageDto: CreateStageDto) {
    const stage = await this.prismaService.stage.create({
      data: {
        name: createStageDto.name,
      },
    });
    return stage;
  }

  async findAll() {
    return await this.prismaService.stage.findMany({
      include: { lids: true, groups: true },
    });
  }

  async findOne(id: number) {
    const stage = await this.prismaService.stage.findUnique({
      where: { id },
      include: { lids:true, groups: true },
    });
    if (!stage) {
      throw new Error(`Stage with ID ${id} not found`);
    }
    return stage;
  }

  async update(id: number, updateStageDto: UpdateStageDto) {
    const stage = await this.prismaService.stage.update({
      where: { id },
      data: updateStageDto,
    });
    if (!stage) {
      throw new Error(`Stage with ID ${id} not found`);
    }
    return stage;
  }

  async remove(id: number) {
    const stage = await this.prismaService.stage.findUnique({
      where: { id },
    });
    if (!stage) {
      throw new Error(`Stage with ID ${id} not found`);
    }
    await this.prismaService.stage.delete({ where: { id } });
    return stage;
  }
}
