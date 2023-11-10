import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MessageCreateComponent } from './message/message-create/message-create.component';
import { MessageDisplayComponent } from './message/message-display/message-display.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error/error.component';
import { ErrorinterceptorInterceptor } from './error/errorinterceptor.interceptor';
import { SignupComponent } from './auth/signup/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageCreateComponent,
    MessageDisplayComponent,
    LoginComponent,
    ErrorComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
              {provide:HTTP_INTERCEPTORS, useClass:ErrorinterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
