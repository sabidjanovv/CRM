import { Module } from '@nestjs/common';
import { LidService } from './lid.service';
import { LidController } from './lid.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LidController],
  providers: [LidService],
})
export class LidModule {}
