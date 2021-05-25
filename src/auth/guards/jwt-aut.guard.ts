import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Verify if the endpoint has the Public decorator
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    // If has it, return true;
    if (isPublic) {
      return true;
    }
    // Otherwise, realize the default validator of AuthGuard('jwt)
    return super.canActivate(context);
  }
}
