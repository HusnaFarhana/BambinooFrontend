import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./user/user-routing.module').then((b) => b.UserRoutingModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-routing.module').then((b) => b.AdminRoutingModule),
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff-routing.module').then((b) => b.StaffRoutingModule),
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: 'page-not-found',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
