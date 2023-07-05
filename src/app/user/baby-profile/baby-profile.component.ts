import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { kidModel } from 'src/app/shared/interfaces';
@Component({
  selector: 'app-baby-profile',
  templateUrl: './baby-profile.component.html',
  styleUrls: ['./baby-profile.component.css'],
})
export class BabyProfileComponent implements OnInit {
  babyId: string;
  baby: kidModel;      
  showEditModal: boolean = false;
  showDeleteConfirmationModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private router: Router
  ) {}
  showConfirmationModal() {
    this.showDeleteConfirmationModal = true;
  }
  cancelDelete() {
    this.showDeleteConfirmationModal = false;
  }
  confirmDelete() {
    this.userService.deleteBaby(this.baby._id);
  }
  openEditModal(id) {
    this.router.navigate(['mykids/babyprofile', id, 'editbaby', id]);
    this.showEditModal = true;
  }
  closeEditModal() {
    this.showEditModal = false;
    this.router.navigate(['mykids/babyprofile', this.babyId]);
    
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.babyId = params['id'];
      this.loadBabyProfile();
    });
  }

  loadBabyProfile(): void {
    this.userService.getBabyProfile(this.babyId).subscribe((response: any) => {
      this.baby = response.baby;
   
      
    });
  }
}
