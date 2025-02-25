import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable()
export class DataInterceptor implements HttpInterceptor {
  constructor(private dataService: DataService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'POST' && request.url === 'https://reqres.in/api/users') {
      const body = request.body;
      this.dataService.addData(body); // Gọi trực tiếp phương thức addData
    }

    return next.handle(request).pipe(
      tap(event => {
        // Xử lý response nếu cần (tùy chọn)
      }, error => {
        console.error('HTTP Error:', error);
      })
    );
  }
}