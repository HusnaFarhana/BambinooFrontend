import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { ProfileComponent } from './profile/profile.component';
import { MykidsComponent } from './mykids/mykids.component';
import { SinglekidComponent } from './singlekid/singlekid.component';
import { TaskComponent } from './task/task.component';
import { MealplanComponent } from './mealplan/mealplan.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StaffLoginComponent,
    ProfileComponent,
    MykidsComponent,
    SinglekidComponent,
    TaskComponent,
    MealplanComponent,
  ],
  imports: [CommonModule, StaffRoutingModule, ReactiveFormsModule],
})
export class StaffModule {}
