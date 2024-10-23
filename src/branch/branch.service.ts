import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto, UpdateBranchDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BranchService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBranchDto: CreateBranchDto) {
    return await this.prismaService.branch.create({
      data: createBranchDto,
    });
  }

  async findAll() {
    return await this.prismaService.branch.findMany();
  }

  async findOne(id: number) {
    const branch = await this.prismaService.branch.findUnique({
      where: { id },
    });

    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    return branch;
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const branch = await this.prismaService.branch.update({
      where: { id },
      data: updateBranchDto,
    });

    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    return branch;
  }

  async remove(id: number){
    const branchExists = await this.prismaService.branch.findUnique({
      where: { id },
    });

    if (!branchExists) {
      throw new NotFoundException(`Branch with ID ${id} does not exist.`);
    }

    await this.prismaService.branch.delete({
      where: { id },
    });

    return {message:"Branch removed successfully"};
  }
}
