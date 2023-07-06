import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-otplogin',
  templateUrl: './otplogin.component.html',
  styleUrls: ['./otplogin.component.css'],
})
export class OtploginComponent implements OnInit {
  form: FormGroup;
  error = null;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      phone: '',
    });
  }
  submit(): void {
    let phone = this.form.getRawValue();
    if (phone.phone == '') {
      Swal.fire('Error', 'Please enter your phone number', 'error');
    } else {
      this.userService.otpLogin(phone, (error: any) => {
        this.error = error.message;
        console.log(error.message);
      });
    }
  }
}
