import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DemoInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.group(req.url);
        console.time('Request Time');
        return next.handle(req)
            .pipe(
                tap(() => {
                    console.timeEnd('Request Time');
                    console.groupEnd();
                })
            );
    }

}
