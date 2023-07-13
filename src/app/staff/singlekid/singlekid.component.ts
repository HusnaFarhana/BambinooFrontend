import { Component,OnInit } from '@angular/core';
import { StaffService } from 'src/app/shared/services/staff.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { iKidModel } from 'src/app/shared/interfaces';
@Component({
  selector: 'app-singlekid',
  templateUrl: './singlekid.component.html',
  styleUrls: ['./singlekid.component.css'],
})
export class SinglekidComponent implements OnInit {
  id: string;
  data: iKidModel;
  constructor(
    private staffService: StaffService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.loadBabyProfile();
    });
  }
  loadBabyProfile(): void {
    this.staffService.singleKid(this.id).subscribe((response: any) => {
      this.data = response.data;
      console.log(this.data,'in .ts');
      
    });
  }
  mealplan() { 
    this.router.navigateByUrl('staff/mealplan');
  }
  routine() {
   this.router.navigateByUrl('staff/routine');
    
  }
}
