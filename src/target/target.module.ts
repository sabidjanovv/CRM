import { Module } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [TargetController],
  providers: [TargetService],
})
export class TargetModule {}
