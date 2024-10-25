import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../types';

export const GetCurrentStaff = createParamDecorator(
  (data: keyof JwtPayloadWithRefreshToken, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const staff = request.staff as JwtPayload;
    console.log('Data',data);

    if (!staff) {
      throw new ForbiddenException("Token noto'g'ri");
    }
    if(!data){
      return staff;
    }

    return staff[data];
  },
);
