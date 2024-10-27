import { Module } from '@nestjs/common';
import { StudentService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [StudentsController],
  providers: [StudentService],
})
export class StudentsModule {}
