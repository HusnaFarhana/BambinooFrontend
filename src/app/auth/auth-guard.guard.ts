import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const token = localStorage.getItem('id_token');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}



@Injectable({
  providedIn: 'root',
})
export class UserBackGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('id_token');
    if (token) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ConsecutiveGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('admin_token');
     const stafftoken = localStorage.getItem('staff_token');
    if (token) {
      console.log("admin tokennn");
      this.router.navigate(['/admin/adminhome']);
      return false;
    } else if (stafftoken) {
      console.log("stafftoken availabe");
      
       this.router.navigate(['/staff/profile']);
       return false;
    } else {
      return true;
    }
  }
}





@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('admin_token');
    const stafftoken = localStorage.getItem('staff_token');

    if (token) {
      this.router.navigate(['/admin/adminhome']);
      return false;
    } else if (stafftoken) {
      console.log('staff heree');
      console.log(stafftoken);

      this.router.navigate(['/staff/profile']);
      return false;
    } else {
      return true;
    }
  }
}
