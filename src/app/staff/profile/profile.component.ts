import { Component,OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { StaffService } from 'src/app/shared/services/staff.service';
import { staffModel,PayloadType } from 'src/app/shared/interfaces'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private staffService: StaffService) { }
  token: any;
  decoded: PayloadType;
  id: string;
  data: staffModel;
  
  ngOnInit(): void {
    this.token = localStorage.getItem('staff_token')
      this.decoded = jwt_decode(this.token);
    this.id = this.decoded.staffid;    
      this.staffService.getStaff(this.id).subscribe((response) => {
       this.data=response.staff
        
      });
  }
}
