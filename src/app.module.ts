import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BranchModule } from './branch/branch.module';
import { RoleModule } from './role/role.module';
import { LidStatusModule } from './lid_status/lid_status.module';
import { ReasonLidModule } from './reason_lid/reason_lid.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath:".env", isGlobal: true}), PrismaModule, AuthModule, BranchModule, RoleModule, LidStatusModule, ReasonLidModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
