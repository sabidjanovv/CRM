import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto, UpdateAuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';
import { User } from '@prisma/client';
import { JwtPayload, ResponseFields, Tokens } from '../common/types';

// import { User } from "@prisma/client"

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async generateTokens(user: User): Promise<Tokens> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
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
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }

  async signup(
    createAuthDto: CreateAuthDto,
    res: Response,
  ): Promise<ResponseFields> {
    const candidate = await this.prismaService.user.findUnique({
      where: {
        email: createAuthDto.email,
      },
    });
    if (candidate) {
      throw new BadRequestException('Bunday foydalanuvchi bor');
    }

    if (createAuthDto.password !== createAuthDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 7);

    const newUser = await this.prismaService.user.create({
      data: {
        name: createAuthDto.name,
        email: createAuthDto.email,
        hashedPassword,
      },
    });
    const tokens = await this.generateTokens(newUser);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.REFRESH_TIME_MS,
      httpOnly: true,
    });

    return { id: newUser.id, accessToken: tokens.access_token };
  }

  async signin(
    email: string,
    password: string,
    res: Response,
  ): Promise<ResponseFields> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new BadRequestException('Email yoki parol xato');
    }

    const passwordMatches = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatches) {
      throw new BadRequestException('Email yoki parol xato');
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.REFRESH_TIME_MS,
      httpOnly: true,
    });

    return { id: user.id, accessToken: tokens.access_token };
  }

  async signout(userId: number, res: Response): Promise<boolean> {
    await this.prismaService.user.updateMany({
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
      // Refresh tokenni tekshirish
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      console.log(id);

      if (!user || !user.hashedRefreshToken) {
        throw new UnauthorizedException('Unauthorized token');
      }

      const refreshMatches = await bcrypt.compare(
        refresh_token,
        user.hashedRefreshToken,
      );

      if (!refreshMatches) {
        throw new UnauthorizedException('Unauthorized token');
      }

      const payload: JwtPayload = { id: user.id, email: user.email };
      const tokens = await this.generateTokens(user);
      await this.updateRefreshToken(user.id, tokens.refresh_token);

      // Yangi refresh tokenni cookie ga yozish
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: +process.env.REFRESH_TIME_MS,
        httpOnly: true,
      });

      return { id: user.id, accessToken: tokens.access_token };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
