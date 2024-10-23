import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create a new user account' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: CreateAuthDto,
  })
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
  @Post('signout')
  async signout(
    @Body('userId') userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signout(userId, res);
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
  @Post('refresh/:id')
  async refreshToken(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(id, refresh_token, res);
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
