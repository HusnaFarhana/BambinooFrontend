import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { KidsComponent } from './kids/kids.component';
import { TutorsComponent } from './tutors/tutors.component';
import { PaymentsComponent } from './payments/payments.component';
import { AddtutorComponent } from './addtutor/addtutor.component';
import { PlansComponent } from './plans/plans.component';
import { AddplanComponent } from './addplan/addplan.component';
import { UsersComponent } from './users/users.component';
import { TutorprofileComponent } from './tutorprofile/tutorprofile.component';
import { EdittutorComponent } from './edittutor/edittutor.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SinglekidComponent } from './singlekid/singlekid.component';
import { MealplanComponent } from './mealplan/mealplan.component';
import { AllotComponent } from './allot/allot.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';



@NgModule({
  declarations: [
    AdminHomeComponent,

    KidsComponent,
    TutorsComponent,
    PaymentsComponent,
    AddtutorComponent,
    PlansComponent,
    AddplanComponent,
    UsersComponent,
    TutorprofileComponent,
    EdittutorComponent,
    AdminLoginComponent,
    SinglekidComponent,
    MealplanComponent,
    AllotComponent,
    EditPlanComponent,
    AdminChatComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class AdminModule {}
