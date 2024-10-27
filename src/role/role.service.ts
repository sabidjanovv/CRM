import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.prismaService.role.create({
      data: {
        name: createRoleDto.name,
      },
    });
    return role;
  }

  async findAll() {
    const roles = await this.prismaService.role.findMany({
      include: { staffs: { include: { staff: true } } },
    });

    return roles;
  }

  async findOne(id: number) {
    const role = await this.prismaService.role.findUnique({
      where: { id },
    });

    if (!role) {
      throw new Error(`Role with ID ${id} not found`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.prismaService.role.update({
      where: { id },
      data: updateRoleDto,
    });

    if (!role) {
      throw new Error(`Role with ID ${id} not found`);
    }
    return role;
  }

  async remove(id: number) {
    const role = await this.prismaService.role.findUnique({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} does not exist.`);
    }

    await this.prismaService.role.delete({
      where: { id },
    });

    return { message: 'Role removed successfully' };
  }
}
