import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './profile/profile.component';
import {
  AuthGuardGuard,
  ConsecutiveGuard,
  UserBackGuard,
  RegisterGuard,
} from '../auth/auth-guard.guard';
import { MykidsComponent } from './mykids/mykids.component';
import { RegisterkidComponent } from './registerkid/registerkid.component';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BabyProfileComponent } from './baby-profile/baby-profile.component';

import { VerifyOTPComponent } from './verify-otp/verify-otp.component';
import { EditbabyComponent } from './editbaby/editbaby.component';
import { ChatComponent } from './chat/chat.component';
import { OtploginComponent } from './otplogin/otplogin.component';
import { OtpComponent } from './otp/otp.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [ConsecutiveGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UserBackGuard, RegisterGuard],
  },
  {
    path: 'signup',

    canActivate: [UserBackGuard, RegisterGuard],
    children: [
      {
        path: '',
        component: SignupComponent,
      },
      {
        path: 'verify',
        component: VerifyOTPComponent,
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'mykids',
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '',
        component: MykidsComponent,
      },
      {
        path: 'babyprofile/:id',
        component: BabyProfileComponent,
        children: [
          {
            path: 'editbaby/:id',
            component: EditbabyComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'register',
    component: RegisterkidComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'edit',
    component: EditProfileComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'otplogin',
    canActivate: [UserBackGuard, RegisterGuard],
    children: [
      {
      path: '',
    component:OtploginComponent  
      },
      {
        path: 'otp/:phone',
        component:OtpComponent
      },
      {
        path: 'otp/reset/:token',
        component:ResetpasswordComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class UserRoutingModule {}
