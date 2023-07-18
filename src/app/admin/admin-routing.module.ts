import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {
  AdminBackGuard,
  AdminGuard,
  ConsecutiveGuard,
} from '../auth/admin.guard';
import { TutorsComponent } from './tutors/tutors.component';
import { KidsComponent } from './kids/kids.component';
import { PaymentsComponent } from './payments/payments.component';
import { AddtutorComponent } from './addtutor/addtutor.component';
import { PlansComponent } from './plans/plans.component';
import { AddplanComponent } from './addplan/addplan.component';
import { UsersComponent } from './users/users.component';
import { TutorprofileComponent } from './tutorprofile/tutorprofile.component';
import { EdittutorComponent } from './edittutor/edittutor.component';
import { SinglekidComponent } from './singlekid/singlekid.component';
import { MealplanComponent } from './mealplan/mealplan.component';
import { AllotComponent } from './allot/allot.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLoginComponent,
    canActivate: [AdminBackGuard, ConsecutiveGuard],
  },
  {
    path: 'adminhome',
    component: AdminHomeComponent,
    canActivate: [AdminGuard, ConsecutiveGuard],
  },
  {
    path: 'tutors',

    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: TutorsComponent,
      },
      {
        path: 'addtutor',
        component: AddtutorComponent,
      },
      {
        path: 'tutorprofile/:id',
        component: TutorprofileComponent,
      },
      {
        path: 'edittutor/:id',
        component: EdittutorComponent,
      },
    ],
  },
  {
    path: 'plans',
    component: PlansComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'addplan',
        component: AddplanComponent,
      },
      {
        path: 'edit/:id',
        component: EditPlanComponent,
      },
    ],
  },
  {
    path: 'kids',
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: KidsComponent,
      },
      {
        path: 'profile/:id',
        component: SinglekidComponent,
      },
    ],
  },
  {
    path: 'payments',
    component: PaymentsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'mealplan',
    component: MealplanComponent,
  },
  {
    path: 'allot/:id',
    component: AllotComponent,
  },
  {
    path: 'admin-chat',
    component: AdminChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
