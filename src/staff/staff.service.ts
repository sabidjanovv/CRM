import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateStaffDto, UpdateStaffDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload, ResponseFields, Tokens } from '../common/types';
import { Staff } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class StaffService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async generateTokens(staff: Staff): Promise<Tokens> {
    const payload: JwtPayload = {
      id: staff.id,
      email: staff.email,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async updateRefreshToken(userId: number, refresh_token: string) {
    const hashedRefreshToken = await bcrypt.hash(refresh_token, 7);
    await this.prismaService.staff.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }

  async signup(
    createStaffDto: CreateStaffDto,
    res: Response,
  ): Promise<ResponseFields> {
    const candidate = await this.prismaService.staff.findUnique({
      where: {
        email: createStaffDto.email,
      },
    });
    if (candidate) {
      throw new BadRequestException('Bunday foydalanuvchi bor');
    }

    if (createStaffDto.password !== createStaffDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }
    const hashedPassword = await bcrypt.hash(createStaffDto.password, 7);

    const newStaff = await this.prismaService.staff.create({
      data: {
        first_name: createStaffDto.first_name,
        last_name: createStaffDto.last_name,
        phone_number: createStaffDto.phone_number,
        email: createStaffDto.email,
        login: createStaffDto.login,
        hashedPassword,
      },
    });
    const tokens = await this.generateTokens(newStaff);
    await this.updateRefreshToken(newStaff.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.REFRESH_TIME_MS,
      httpOnly: true,
    });

    return { id: newStaff.id, accessToken: tokens.access_token };
  }

  async signin(
    login: string,
    password: string,
    res: Response,
  ): Promise<ResponseFields> {
    const staff = await this.prismaService.staff.findUnique({
      where: { login },
    });
    if (!staff) {
      throw new BadRequestException('Email yoki parol xato');
    }

    const passwordMatches = await bcrypt.compare(
      password,
      staff.hashedPassword,
    );
    if (!passwordMatches) {
      throw new BadRequestException('Email yoki parol xato');
    }

    const tokens = await this.generateTokens(staff);
    await this.updateRefreshToken(staff.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.REFRESH_TIME_MS,
      httpOnly: true,
    });

    return { id: staff.id, accessToken: tokens.access_token };
  }

  async signout(userId: number, res: Response): Promise<boolean> {
    await this.prismaService.staff.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: { not: null },
      },
      data: {
        hashedRefreshToken: null,
      },
    });

    res.clearCookie('refresh_token');
    return true;
  }

  async refreshToken(
    id: number,
    refresh_token: string,
    res: Response,
  ): Promise<ResponseFields> {
    try {
      const staff = await this.prismaService.staff.findUnique({
        where: { id },
      });

      console.log(id);

      if (!staff || !staff.hashedRefreshToken) {
        throw new UnauthorizedException('Unauthorized token');
      }

      const refreshMatches = await bcrypt.compare(
        refresh_token,
        staff.hashedRefreshToken,
      );

      if (!refreshMatches) {
        throw new UnauthorizedException('Unauthorized token');
      }

      const payload: JwtPayload = { id: staff.id, email: staff.email };
      const tokens = await this.generateTokens(staff);
      await this.updateRefreshToken(staff.id, tokens.refresh_token);

      // Yangi refresh tokenni cookie ga yozish
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: +process.env.REFRESH_TIME_MS,
        httpOnly: true,
      });

      return { id: staff.id, accessToken: tokens.access_token };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(createStaffDto: CreateStaffDto) {
    const candidate = await this.prismaService.staff.findUnique({
      where: {
        login: createStaffDto.login,
      },
    });

    if (candidate) {
      throw new BadRequestException('Email already exists');
    }

    const role = await this.prismaService.role.findUnique({
      where: { name: createStaffDto.role },
    });

    if (!role) {
      throw new NotFoundException('Role does not exist');
    }

    if (createStaffDto.password !== createStaffDto.confirm_password) {
      throw new BadRequestException('Password does not match');
    }
    const hashedPassword = await bcrypt.hash(createStaffDto.password, 10);

    const newStaff = await this.prismaService.staff.create({
      data: {
        first_name: createStaffDto.first_name,
        last_name: createStaffDto.last_name,
        phone_number: createStaffDto.phone_number,
        email: createStaffDto.email,
        login: createStaffDto.login,
        hashedPassword,
        roles: {
          create: [{ roleId: role.id }],
        },
        
      },
    });


    return newStaff;
  }

  async findAll() {
    return await this.prismaService.staff.findMany({
      include: {
        roles: {
          include: { role: true },
        },
        groups:{
          include:{group:true}
        }
      },
    });
  }

  async findOne(id: number) {
    const staff = await this.prismaService.staff.findUnique({
      where: { id },
    });

    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const staff = await this.prismaService.staff.update({
      where: { id },
      data: updateStaffDto,
    });

    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }

  async remove(id: number) {
    const staff = await this.prismaService.staff.delete({
      where: { id },
    });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    await this.prismaService.staff.delete({
      where: { id },
    });

    return { message: 'Staff deleted successfully' };
  }
}
