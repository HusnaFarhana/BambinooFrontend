import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Validators } from '@angular/forms';
import { dateOfBirthValidator } from '../../shared/date-validator';
@Component({
  selector: 'app-addtutor',
  templateUrl: './addtutor.component.html',
  styleUrls: ['./addtutor.component.css'],
})
export class AddtutorComponent implements OnInit {
  form: FormGroup;
  file: File | null;
  error: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public adminService: AdminService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', [Validators.required,dateOfBirthValidator]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      adhar: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
  url = '';
  submit() {
    if (this.form.invalid) {
      this.error = true;
      return;
    }
    const formData = {
      name: this.form.value.name,
      email: this.form.value.email,
      dob: this.form.value.dob,
      password: this.form.value.password,
      address: this.form.value.address,
      contact: this.form.value.contact,
      adhar: this.form.value.adhar,
      image: this.url,
    };

    this.adminService.registerTutor(formData);
  }
  onselectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

}
