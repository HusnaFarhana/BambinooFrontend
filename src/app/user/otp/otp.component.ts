import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  form: FormGroup;
  error = null;
  data: any={};
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
     this.route.params.subscribe((params: Params) => {
       this.data.phone = params['phone'];
     });
    this.form = this.formBuilder.group({
      otp: '',
    });
  }
  submit(): void {
    let otp = this.form.getRawValue();
    this.data.otp = otp.otp;    
    if (otp.otp == '') {
      Swal.fire('Error', 'Please enter the OTP', 'error');
    } else {
      this.userService.otpLoginVerify(this.data, (error: any) => {
        this.error = error.message;
        console.log(error.message);
      });
    }
  }
}
