import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminService } from 'src/app/shared/services/admin.service';  

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  error=null
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    
    });
  }
  submit(): void {
    let admin = this.form.getRawValue();
    console.log(admin);

    if (admin.email == '' || admin.password == '' ) {
      Swal.fire('Error', 'Please enter all the fields', 'error');
    } else {
      console.log(admin + 'otw service');

      this.adminService.adminLogin(admin,(error:any)=>{this.error=error.message});
    }
  }
}
