import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, UpdateAuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';
import { User } from '@prisma/client';

// import { User } from "@prisma/client"

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async generateTokens(user: User) {
    const payload = {
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

  async signup(createAuthDto: CreateAuthDto, res: Response) {
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

    return { id: newUser.id, accesstoken: tokens.access_token };
  }

  async signin(email: string, password: string, res: Response) {
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

    return { id: user.id, accesstoken: tokens.access_token };
  }

  async signout(userId: number, res: Response) {
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
    return { message: 'Tizimdan muvaffaqiyatli chiqildi' };
  }

  async refreshToken(id: number, refresh_token: string, res: Response) {
    try {
      const verified_token = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (!verified_token) {
        throw new UnauthorizedException('Unauthorized token');
      }
      if (id != verified_token.id) {
        throw new ForbiddenException('Forbidden admin');
      }
      const payload = { id: verified_token.id, email: verified_token.email };
      const token = this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      });
      return {
        token,
      };
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
