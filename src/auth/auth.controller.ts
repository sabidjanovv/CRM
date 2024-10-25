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
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard, RefreshTokenGuard } from '../common/guards';
import { GetCurrentUser, Public } from '../common/decorators';
import { HttpStatusCode } from 'axios';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { JwtPayloadWithRefreshToken, ResponseFields } from '../common/types';

@ApiTags('Auth')
@UseGuards(AccessTokenGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create a new user account' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: CreateAuthDto,
  })
  @Public()
  @Post('signup')
  async signup(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signup(createAuthDto, res);
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
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(email, password, res);
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
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean>{
    return this.authService.signout(+userId, res);
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
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUser() user: JwtPayloadWithRefreshToken,
    @Res({ passthrough: true }) res: Response,
  ):Promise<ResponseFields> {
    return this.authService.refreshToken(userId, refreshToken, res);
  }



  @ApiOperation({ summary: 'Create a new auth entry' })
  @ApiResponse({
    status: 201,
    description: 'Auth entry created successfully',
    type: CreateAuthDto,
  })
  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @ApiOperation({ summary: 'Retrieve all auth entries' })
  @ApiResponse({
    status: 200,
    description: 'List of auth entries',
  })
  @Get()
  async findAll() {
    return this.authService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a specific auth entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'Auth entry found',
  })
  @ApiResponse({
    status: 404,
    description: 'Auth entry not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a specific auth entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'Auth entry updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Auth entry not found',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @ApiOperation({ summary: 'Delete a specific auth entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'Auth entry removed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Auth entry not found',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
