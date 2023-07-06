import { NgModule } from '@angular/core';


import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { NavbarComponent } from './navbar/navbar.component';
import { StaffModule } from './staff/staff.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/user-interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { OtploginComponent } from './user/otplogin/otplogin.component';
import { OtpComponent } from './user/otp/otp.component';


@NgModule({
  declarations: [AppComponent, NavbarComponent, PageNotFoundComponent, OtploginComponent, OtpComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CloudinaryModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    StaffModule,
    UserModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
