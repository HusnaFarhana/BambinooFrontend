import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
error=null
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }
  submit(): void {
    let user = this.form.getRawValue();
    if (
      user.email == '' ||
      user.password == '' 
    ) {
      Swal.fire('Error', 'Please enter all the fields', 'error');
    } else {
      this.userService.loginUser(user, (error: any) => { this.error = error.message; console.log(error.message);
      });
      
    }
  }
}
