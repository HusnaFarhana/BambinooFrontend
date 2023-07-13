import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetpasswordComponent implements OnInit {
  form: FormGroup;
  error = null;
  token: string;
  data: any={};
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.token = params['token'];
      });
    console.log(this.token),'token ready for verification';
    
    this.userService.validateToken(this.token)
    this.form = this.formBuilder.group({
      password: '',
    });
  }
  submit(): void {
    const newpass = this.form.getRawValue();
    console.log(newpass,'newpass here');
    this.data.password = newpass;
    this.data.token=this.token
   this.userService.reset(this.data);
  }
}
