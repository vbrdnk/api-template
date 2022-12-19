import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JWTStrategy.JWTUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
