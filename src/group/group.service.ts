import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    const staff = await this.prismaService.staff.findUnique({
      where: {
        login: createGroupDto.staff,
      },
    });

    if (!staff) {
      throw new BadRequestException('Staff does not exists');
    }

    const newGroup = await this.prismaService.group.create({
      data: {
        group_name: createGroupDto.group_name,
        lesson_start_time: createGroupDto.lesson_start_time,
        lesson_continuous: createGroupDto.lesson_continuous,
        lesson_week_day: createGroupDto.lesson_week_day,
        group_stage_id: createGroupDto.group_stage_id,
        room_number: createGroupDto.room_number,
        room_floor: createGroupDto.room_floor,
        branch_id: createGroupDto.branch_id,
        lessons_quant: createGroupDto.lessons_quant,
        is_active: createGroupDto.is_active,
        staffs: {
          create: [{ staffId: staff.id }],
        }
      },
    });
    return newGroup;
  }

  async findAll() {
    const groups = await this.prismaService.group.findMany({
      include: {
        branch: true,
        lessons: true,
        stage: true,
        staffs: {
          include: { staff: true },
        },
        // students: {
        //   include: { student: true },
        // },
      },
    });
    return groups;
  } 

  async findOne(id: number) {
    const group = await this.prismaService.group.findUnique({
      where: { id },
      include: {
        branch: true,
        lessons: true,
        stage: true,
        staffs: {
          include: { staff: true },
        },
        // students:{
        //   include:{student:true}
        // }
      },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.prismaService.group.update({
      where: { id },
      data: updateGroupDto,
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async remove(id: number) {
    const group = await this.prismaService.group.findUnique({
      where: { id },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} does not exist.`);
    }

    await this.prismaService.group.delete({
      where: { id },
    });

    return { message: 'Group removed successfully' };
  }
}
