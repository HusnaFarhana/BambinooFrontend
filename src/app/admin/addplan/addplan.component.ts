import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-addplan',
  templateUrl: './addplan.component.html',
  styleUrls: ['./addplan.component.css'],
})
export class AddplanComponent implements OnInit,OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    public adminService: AdminService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      agegroup: '0-1',
      description: '',
      price: '',
      athome: 'no',
    });
  }
  submit() {
    let plan = this.form.getRawValue();
    this.subscription = this.adminService
      .addplan(plan)
      .subscribe((response) => {
        this.adminService.emitPlanAdded(plan);
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
