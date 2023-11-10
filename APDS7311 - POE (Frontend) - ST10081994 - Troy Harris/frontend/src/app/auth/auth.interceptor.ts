import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthServiceService) {}

  // Intercept method to modify the HTTP request by adding the authorization token
  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    // Get the authentication token from the AuthServiceService
    const authToken = this.authservice.getToken();

    // Clone the request and add the authorization header with the token
    const authRequest = 
      request.clone({headers:request.headers.set("Authorization", "Bearer " + authToken)});
      
    // Pass the modified request to the next handler
    return next.handle(authRequest);
  }
}
