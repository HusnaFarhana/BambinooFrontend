import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import jwt_decode from 'jwt-decode';
import { UserPayload,userModel } from 'src/app/shared/interfaces';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService) {}
  userid: String = '';
  data:userModel;
  decoded: UserPayload;
  token: any;
  ngOnInit(): void {
    this.token = localStorage.getItem('id_token');
    this.decoded = jwt_decode(this.token);
    this.userid = this.decoded.userid;

    this.userService.getUser(this.userid).subscribe((response) => {
      this.data = response.user[0];
    });
  }
}
