import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/services/user.service';
import { Router, NavigationExtras } from '@angular/router';
import { Validators, AbstractControl } from '@angular/forms';
import { dateOfBirthValidator } from '../../shared/date-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      dob: ['', [Validators.required, dateOfBirthValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      contactnum: ['', [Validators.required, Validators.minLength(10)]],
      adhar: ['', Validators.required],
    });
  }
  submit(): void {
    let user = this.form.getRawValue();
     if (this.form.invalid) {
       this.error = true;
       return;
     } else {
       this.userService.registerUser(user);
     }
  }
 
}
