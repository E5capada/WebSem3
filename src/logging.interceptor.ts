import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pug = require('pug');

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startStamp = performance.now();
    return next.handle().pipe(
      map((data) => {
        const res = performance.now() - startStamp;
        return {
          ...data,
          duration: res,
        };
      }),
    );
  }
}

