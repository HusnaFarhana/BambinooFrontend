import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { staffModel } from 'src/app/shared/interfaces';
import { dateOfBirthValidator } from '../../shared/date-validator';
@Component({
  selector: 'app-edittutor',
  templateUrl: './edittutor.component.html',
  styleUrls: ['./edittutor.component.css'],
})
export class EdittutorComponent implements OnInit {
  id: string;
  staff: staffModel;
  form: FormGroup;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadStaff(this.id);
  }

  loadStaff(id) {
    this.adminService.getStaffProfile(id).subscribe((response: any) => {
      this.staff = response.tutor;
      this.initializeForm();
    });
  }
  initializeForm(): void {
    this.form = this.formBuilder.group({
      name: [this.staff.name, Validators.required],
      dob: [this.staff.dob, [Validators.required, dateOfBirthValidator]],
      email: [this.staff.email, Validators.required],
      password: [this.staff.password, Validators.required],
      contact: [this.staff.contact, Validators.required],
      address: [this.staff.address, Validators.required],
      adharNo: [this.staff.adharNo, Validators.required],
      _id: [this.staff._id],
    });
  }
  submit() {
    if (this.form.invalid) {
        this.error = true;
      return;
    }
    let staff = this.form.getRawValue();


    this.adminService.editStaff(staff);
  }

}


