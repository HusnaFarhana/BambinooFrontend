import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const token = localStorage.getItem('admin_token');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/admin']);
      return false;
    }
  }
}


@Injectable({
  providedIn: 'root',
})
export class AdminBackGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('admin_token');
    if (token) {
      this.router.navigate(['/admin/adminhome']);
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
    const usertoken = localStorage.getItem('id_token');
    const stafftoken = localStorage.getItem('staff_token');
    if (usertoken) {
      this.router.navigate(['/']);
      return false;
    } else if (stafftoken) { 
       this.router.navigate(['/staff/profile']);
       return false;
    } else{
      return true;
    }
  }
}