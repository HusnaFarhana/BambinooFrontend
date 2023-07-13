import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { iUserPayload,iPlanModel } from 'src/app/shared/interfaces';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(public userService: UserService,
    private router: Router) { }
  name: String = '';
  decoded: iUserPayload;
  token: any;
  plans: iPlanModel[];
  ngOnInit() {
    this.userService.getHome().subscribe((response: any) => {
      this.plans = response.plans;
    });
    this.token = localStorage.getItem('id_token');
    if (this.token) {
      this.userService.isAuthenticated = true;
    }
    this.decoded = jwt_decode(this.token);
    this.name = this.decoded.name;
  }
  logout() {
    localStorage.removeItem('id_token');
    this.userService.isAuthenticated = false;
    this.router.navigateByUrl('/');
  }
}
