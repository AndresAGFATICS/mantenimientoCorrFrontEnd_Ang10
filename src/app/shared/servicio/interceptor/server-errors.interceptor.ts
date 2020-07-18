import { Injectable , Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { AuthService } from '../../../publico/shared/servicio/auth.service'

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {

  constructor(private injector : Injector){ }

  inflightAuthRequest = null;


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService);
    let tokenizedReq = request.clone({
      setHeaders: {
      //Authorization: `Bearer ${authService.getToken()}`
      }
      
    })
    
    // If the call fails, retry until 1 times before throwing an error
    return next.handle(tokenizedReq).pipe(retry(1));
  }
}
