import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BranchModule } from './branch/branch.module';
import { RoleModule } from './role/role.module';
import { LidStatusModule } from './lid_status/lid_status.module';
import { ReasonLidModule } from './reason_lid/reason_lid.module';
import { StaffModule } from './staff/staff.module';
import { GroupModule } from './group/group.module';
import { LessonModule } from './lesson/lesson.module';
import { StudentsModule } from './students/students.module';
import { LidModule } from './lid/lid.module';
import { StageModule } from './stage/stage.module';
import { PaymentModule } from './payment/payment.module';
import { StudentLessonModule } from './student_lesson/student_lesson.module';
import { TargetModule } from './target/target.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath:".env", isGlobal: true}), PrismaModule, AuthModule, BranchModule, RoleModule, LidStatusModule, ReasonLidModule, StaffModule, GroupModule, LessonModule, StudentsModule, LidModule, StageModule, PaymentModule, StudentLessonModule, TargetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
