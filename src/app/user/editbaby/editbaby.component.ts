import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators, AbstractControl } from '@angular/forms';
import { iKidModel } from 'src/app/shared/interfaces';
import { dateOfBirthValidator } from '../../shared/date-validator';
@Component({
  selector: 'app-editbaby',
  templateUrl: './editbaby.component.html',
  styleUrls: ['./editbaby.component.css'],
})
export class EditbabyComponent implements OnInit {
  babyId: string;
  baby: iKidModel;
  form: FormGroup;
  error:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.babyId = params['id'];
      this.loadBabyProfile();
      
    });
  }

  loadBabyProfile(): void {
    this.userService.getBabyProfile(this.babyId).subscribe((response: any) => {
      this.baby = response.baby;
      this.initializeForm();
    });
  }
  initializeForm(): void {
    this.form = this.formBuilder.group({
      name: [this.baby.name, Validators.required],
      dob: [this.baby.dob, [Validators.required,dateOfBirthValidator
      ]],
      medical: [this.baby.medications, Validators.required],
      gender: [this.baby.gender, Validators.required],
      id: [this.baby._id],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.error = true;
      return;
    }
    let upd = this.form.getRawValue();
     if (
       upd.name == '' ||
       upd.dob == '' ||
       upd.medical == '' ||
       upd.gender == ''
     ) {
        this.error = true;
     } else {
        this.userService.editBabyProfile(upd).subscribe((response) => {
          this.router.navigateByUrl('/mykids');
        });
     }
   
    
  }


 
}
