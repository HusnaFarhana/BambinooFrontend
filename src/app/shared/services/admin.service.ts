import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  isAdminAuthenticated: boolean = false;
  admintoken: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  adminLogin(data: any, errorfn: (error: any) => void) {
    return this.http
      .post<any>(environment.apiUrl + 'admin/adminLogin', data)
      .subscribe(
        (response) => {
          localStorage.setItem('admin_token', response.admintoken);
          if (response.admintoken) {
            this.admintoken = response.admintoken;
            this.isAdminAuthenticated = true;
            this.router.navigateByUrl('/adminhome');
          }
        },
        (error) => {
          errorfn(error);
        }
      );
  }

  registerTutor(data: any) {
    return this.http
      .post<any>(environment.apiUrl + 'admin/addTutor', data)
      .subscribe((response) => {
        this.router.navigateByUrl('/tutors');
      });
    }

    getStaff() {
    return this.http.get(environment.apiUrl + 'admin/getTutors');
  }
  
  getKids() {
    return this.http.get(environment.apiUrl + 'admin/getkids');
  }
  addplan(data): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'admin/addplan', data);
  }


  private planAddedSubject = new Subject<any>();

  planAdded$ = this.planAddedSubject.asObservable();

  emitPlanAdded(plan: any) {
    this.planAddedSubject.next(plan);
  }

  
  getStaffProfile(id: any) {
    return this.http.get<any>(
      environment.apiUrl + `admin/tutors/tutorprofile/${id}`
    );
  }
  getPlans(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'admin/getplans')
    
  }
  getUsers() {
    return this.http.get(environment.apiUrl + 'admin/getusers');
  }
  getdash() {
    return this.http.get(environment.apiUrl + 'admin/getdash');
  }


  getBabyProfile(id: any) {
    return this.http.get<any>(environment.apiUrl + `admin/kids/profile/${id}`);
  }

  allotmentor(data) {
    return this.http
      .post<any>(environment.apiUrl + 'admin/allot', data)
      .subscribe((response: any) => {
        this.router.navigateByUrl('/kids');
      });
  }
  editStaff(data) {
    return this.http
      .post<any>(environment.apiUrl + 'admin/edittutor', data)
      .subscribe((response: any) => {
        this.router.navigateByUrl('/tutors');
      });
  }
  getAPlan(id: any) {
    return this.http.get<any>(environment.apiUrl + `admin/getplan/${id}`);
  }
  editPlan(data: any) {
    return this.http
      .post<any>(environment.apiUrl + 'admin/editplan', data)
      .subscribe((response) => {
        this.router.navigateByUrl('/plans');
      });
  }
  deleteplan(id) {
    return this.http.get<any>(environment.apiUrl + `admin/deleteplan/${id}`);
  }

  deleteStaff(id: any) {
    return this.http
      .get<any>(environment.apiUrl + `admin/deletestaff/${id}`)
      .subscribe((response) => {
        this.router.navigateByUrl('/tutors');
      });
  }
  getPayments() {
    return this.http.get<any>(environment.apiUrl + 'admin/payments');
  }
  getChatHistory() {
    return this.http.get<any>(environment.apiUrl + 'admin/chathistory');
  }
}
