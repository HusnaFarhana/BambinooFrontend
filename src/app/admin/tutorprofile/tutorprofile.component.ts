import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';  
import{iStaffModel} from '../../shared/interfaces'
@Component({
  selector: 'app-tutorprofile',
  templateUrl: './tutorprofile.component.html',
  styleUrls: ['./tutorprofile.component.css'],
})
export class TutorprofileComponent implements OnInit {
  staffId: string;
  staff: iStaffModel;
  showDeleteConfirmationModal: boolean = false;
  constructor(
    private route: ActivatedRoute,
    public adminService: AdminService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.staffId = params['id'];
      this.loadStaffProfile();
    });
  }
  loadStaffProfile(): void {
    this.adminService
      .getStaffProfile(this.staffId)
      .subscribe((response: any) => {
        console.log(response.tutor,'teetrrr');
        this.staff = response.tutor;
      });
  }

  viewkid(id) {
    this.router.navigate(['/admin/kids/profile', id]);
  }
  showConfirmationModal() {
    this.showDeleteConfirmationModal = true;
  }
  cancelDelete() {
    this.showDeleteConfirmationModal = false;
    console.log('cancelled');
  }
  confirmDelete() {
    this.adminService.deleteStaff(this.staff._id);
    this.showDeleteConfirmationModal = false;
    console.log('deleted');
  }
  
  edit(id) {
     this.router.navigate(['/admin/tutors/edittutor', id]);
  }
}

