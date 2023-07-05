import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
})
export class VerifyOTPComponent implements OnInit {
  form: FormGroup;
  user: any;
  error = null;
  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      otp: '',
    });
    this.route.queryParams.subscribe((params) => {
      if (params['user']) {
        this.user = JSON.parse(params['user']);
      }
    });
  }
  submit() {
    let otpData = this.form.getRawValue();
    console.log(otpData);
    otpData.details = this.user;
    console.log(otpData);

    this.userService.verify(otpData,(error:any)=>{this.error=error.message});
  }
}
