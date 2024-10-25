import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';
import { JwtPayload } from '../types';

export const GetCurrentStaffId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const staff = request.staff as JwtPayload;

    if (!staff) {
      throw new ForbiddenException("Token noto'g'ri");
    }

    console.log('staff', staff);

    return staff.id;
  },
);
