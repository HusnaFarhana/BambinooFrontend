import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { ProfileComponent } from './profile/profile.component';
import { SinglekidComponent } from './singlekid/singlekid.component';
import { MykidsComponent } from './mykids/mykids.component';
import { TaskComponent } from './task/task.component';
import { MealplanComponent } from './mealplan/mealplan.component';
import {
  StaffGuard,
  StaffBackGuard,
  StaffAccessGuard,
} from '../auth/staff.guard';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StaffLoginComponent,
        canActivate: [StaffBackGuard, StaffAccessGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [StaffGuard],
      },
      {
        path: 'singlekid/:id',
        component: SinglekidComponent,
        canActivate: [StaffGuard],
      },
      {
        path: 'mykids',
        component: MykidsComponent,
        canActivate: [StaffGuard],
      },
      {
        path: 'mealplan',
        component: MealplanComponent,
        canActivate: [StaffGuard],
      },
      {
        path: 'routine',
        component: TaskComponent,
        canActivate: [StaffGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
