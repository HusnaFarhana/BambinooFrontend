import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environment'
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class StaffService {

  isStaffAuthenticated: boolean = false;
  stafftoken: string = '';
 
  constructor(private http: HttpClient, private router: Router) {}

  staffLogin(data, errorfn: (error: any) => void) {
    return this.http
      .post<any>(environment.apiUrl + 'staff/stafflogin', data)
      .subscribe(
        (response) => {
          console.log(response);

          localStorage.setItem('staff_token', response.token);
          if (response.token) {
            this.stafftoken = response.token;
            
            this.isStaffAuthenticated = true;
            this.router.navigateByUrl('staff/profile');
          }
        },
        (error) => {
          errorfn(error);
        }
      );
  }

  getStaff(data: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `staff/myprofile/${data}`);
  }
  getKids(id) {
    
        return this.http.get<any>(
          environment.apiUrl + `staff/mypupils/${id}`
        );

  }
  singleKid(id) {
     return this.http.get<any>(environment.apiUrl + `staff/singlekid/${id}`);
  }
}
