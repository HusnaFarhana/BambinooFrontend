import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StaffService } from 'src/app/shared/services/staff.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css'],
})
export class StaffLoginComponent implements OnInit {
  error = null;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private staffService: StaffService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }
  submit(): void {
   
    let staff = this.form.getRawValue();
  

    if (staff.email == '' || staff.password == '') {
      Swal.fire('Error', 'Please enter all the fields', 'error');
    } else {

      this.staffService.staffLogin(staff, (error: any) => {
        this.error = error.message;
      });
    }
  }
}
