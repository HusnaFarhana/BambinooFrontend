import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthenticated: boolean = false;
  token: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  getHome(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `home`);
  }
  getNav(id) {
    return this.http.get<any>(environment.apiUrl + `nav/${id}`);
  }
  registerUser(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers: headers };
    console.log(data, 'in service');

    return this.http
      .post<any>(environment.apiUrl + 'register', data, options)
      .subscribe((response) => {
        if (response.emailExists) {
          Swal.fire('Error', 'Email already exists', 'error');
        } else {
          const navigationExtras: NavigationExtras = {
            queryParams: { user: JSON.stringify(response.result) },
          };
          console.log('in user service');
          console.log(navigationExtras);

          this.router.navigate(['signup/verify'], navigationExtras);
        }
      });
  }

  loginUser(data: any, errorfn: (error: any) => void) {
    return this.http
      .post<any>(environment.apiUrl + 'userLogin', data)
      .subscribe(
        (response) => {
          localStorage.setItem('id_token', response.token);
          if (response.token) {
            this.token = response.token;
            this.isAuthenticated = true;
            this.router.navigateByUrl('/');
          }
        },
        (error) => {
          errorfn(error);
        }
      );
  }
  logout(data: any) {
    return this.http
      .post<any>(environment.apiUrl + 'logout', { data: data })
      .subscribe((response) => {
        if (response.status) {
          localStorage.removeItem('id_token');
          this.isAuthenticated = false;
          this.router.navigateByUrl('/');
        }
      });
  }
  getUser(data: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `userProfile/${data}`);
  }

  mykids(data: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `mykids/${data}`);
  }


  registerKid(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers: headers };
    console.log(data, 'in register kid user service');
    return this.http
      .post<any>(environment.apiUrl + 'registerKid', data, options)
      .subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/mykids');
      });
  }

  verifyPayment(response: any): Observable<any> {
    console.log('in verify payment user service');
    return this.http.post<any>(environment.apiUrl + 'verifyPayment', response);
  }

  updateUser(data: any) {
    return this.http
      .post<any>(environment.apiUrl + 'updateuser', data)
      .subscribe((response) => {
        if (response) {
          this.router.navigateByUrl('/profile');
        }
      });
  }
  getBabyProfile(id: any) {
    return this.http.get<any>(environment.apiUrl + `mykids/babyprofile/${id}`);
  }
  verify(data: any, errorfn: (error: any) => void) {
    return this.http.post<any>(environment.apiUrl + 'verify', data).subscribe(
      (response) => {
        console.log(response);
        if (response.success) {
          localStorage.setItem('id_token', response.data.token);
          this.token = response.data.token;
          this.isAuthenticated = true;
          this.router.navigateByUrl('/');
        }
      },
      (error) => {
        errorfn(error);
      }
    );
  }
  editBabyProfile(data) {
    return this.http.post<any>(environment.apiUrl + 'mykids/editbaby', data);
  }
  deleteBaby(id) {
    return this.http
      .post<any>(environment.apiUrl + 'mykids/deletebaby', { id: id })
      .subscribe((response) => {
        if (response.success) {
          this.router.navigateByUrl('/mykids');
        }
      });
  }
}





@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileDataSubject = new BehaviorSubject<any>(null);
  profileData$ = this.profileDataSubject.asObservable();

  updateProfileData(profileData: any) {
    this.profileDataSubject.next(profileData);
  }
}















































// BehaviorSubject is a type of Subject provided by RxJS, which is a library for reactive programming in JavaScript. It is used to create an observable that emits the most recent value to new subscribers and continues to emit subsequent values as they are updated.

// In the context of the ProfileService example I provided, BehaviorSubject is used to store and share the latest profile data across different components or services. Here's how it works:

// When the profile data is updated in the EditProfileComponent, the updateProfileData method of the ProfileService is called with the new profile data as a parameter.

// The updateProfileData method calls next() on the profileDataSubject, which emits the new profile data as the next value.

// The profileDataSubject stores the emitted value as its current value and emits it to any subscribers (i.e., components or services) that have subscribed to the profileData$ observable.

// Subscribers to the profileData$ observable receive the latest profile data immediately upon subscribing, and they conti