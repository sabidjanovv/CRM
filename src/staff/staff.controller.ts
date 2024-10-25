import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto, UpdateStaffDto } from './dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  GetCurrentStaff,
  GetCurrentStaffId,
  Public,
} from '../common/decorators';
import { RefreshTokenGuard } from '../common/guards';
import { JwtPayloadWithRefreshToken, ResponseFields } from '../common/types';
import { Response } from 'express';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOperation({ summary: 'Create a new user account' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: CreateStaffDto,
  })
  @Public()
  @Post('signup')
  async signup(
    @Body() createStaffDto: CreateStaffDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.staffService.signup(createStaffDto, res);
  }

  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({
    status: 200,
    description: 'User signed in successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @Public()
  @Post('signin')
  async signin(
    @Body('login') login: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.staffService.signin(login, password, res);
  }

  @ApiOperation({ summary: 'Sign out a user' })
  @ApiResponse({
    status: 200,
    description: 'User signed out successfully',
  })
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signout(
    // @Body('userId') userId: number,
    @GetCurrentStaffId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return this.staffService.signout(+userId, res);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token is invalid',
  })
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshToken(
    @GetCurrentStaffId() staffId: number,
    @GetCurrentStaff('refreshToken') refreshToken: string,
    @GetCurrentStaff() staff: JwtPayloadWithRefreshToken,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseFields> {
    return this.staffService.refreshToken(staffId, refreshToken, res);
  }

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }
}
