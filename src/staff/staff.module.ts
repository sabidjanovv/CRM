import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
} from '../common/strategies';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [JwtModule.register({}), PrismaModule],
  controllers: [StaffController],
  providers: [StaffService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class StaffModule {}
