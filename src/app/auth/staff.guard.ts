import { Injectable } from '@angular/core';
import {  CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StaffGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const token = localStorage.getItem('staff_token');
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
export class StaffBackGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('staff_token');
    if (token) {
      this.router.navigate(['staff/profile']);
      return false;
    } else {
      return true;
    }
  }
}


@Injectable({
  providedIn: 'root',
})
export class StaffAccessGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
  const admintoken = localStorage.getItem('admin_token');
  const usertoken = localStorage.getItem('id_token');
  if (admintoken) {
    this.router.navigate(['/admin/adminhome']);
    return false;
  } else if (usertoken) {
    this.router.navigate(['/']);
    return false;
  } else {
    return true;
  }
  }
}
