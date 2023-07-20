import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { AdminService } from '../shared/services/admin.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { StaffService } from '../shared/services/staff.service';
import { ProfileService } from '../shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public userService: UserService,
    private router: Router,
    public adminService: AdminService,
    public staffService: StaffService,
    private profileService: ProfileService
  ) {}
  name: String = '';
  decoded: any;
  token: any;
  id: any;
  admintoken: any;
  stafftoken: any;
  notification: string = '';
  ngOnInit() {
    this.token = localStorage.getItem('id_token');
    this.admintoken = localStorage.getItem('admin_token');
    this.stafftoken = localStorage.getItem('staff_token');
    this.userService.notification$.subscribe((message) => {
      this.notification = message;
    });
    if (this.token) {
      this.userService.isAuthenticated = true;
      this.decoded = jwt_decode(this.token);
      this.id = this.decoded.userid;

      this.profileService.profileData$.subscribe((response) => {
        if (response) {
          this.name = response.name;
        }
      });

      this.userService.getNav(this.id).subscribe((response) => {
        this.name = response.data.name;
      });
    }
    if (this.admintoken) {
      this.adminService.isAdminAuthenticated = true;
    }
    if (this.stafftoken) {
      this.staffService.isStaffAuthenticated = true;
      this.decoded = jwt_decode(this.stafftoken);
      this.name = this.decoded.name;
      this.id = this.decoded.staffid;
    }
  }
  logout() {
    this.userService.logout(this.id);
  }
  adminLogout() {
    localStorage.removeItem('admin_token');
    this.adminService.isAdminAuthenticated = false;
    this.router.navigateByUrl('/admin');
  }
  staffLogout() {
    localStorage.removeItem('staff_token');
    this.staffService.isStaffAuthenticated = false;
    this.router.navigateByUrl('/staff');
  }
}
