import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Subscription } from 'rxjs';
import { iPlanModel } from 'src/app/shared/interfaces'; 

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
})
export class PlansComponent implements OnInit, OnDestroy {
  showDeleteConfirmationModal: boolean = false;
  plans: iPlanModel[];
  pageSize: number = 2;
  currentPage: number = 1;
  totalPlans: number = 0;
  deletePlanId: string = '';
  private planAddedSubscription: Subscription;
 

  constructor(
    public adminService: AdminService,
  
  ) {}
  ngOnInit(): void {
    this.planAddedSubscription = this.adminService.planAdded$.subscribe(
      (plan) => {
        this.plans.push(plan);
      }
    );

    this.adminService.getPlans().subscribe((response: any) => {
      this.plans = response.plans;
      this.totalPlans = this.plans.length;


    });
  }
  showConfirmationModal(id) {
    this.deletePlanId = id;
    this.showDeleteConfirmationModal = true;
  }
  cancelDelete() {
    this.showDeleteConfirmationModal = false;
  
  }
  confirmDelete(id) {
    this.showDeleteConfirmationModal = false;
    this.adminService.deleteplan(id).subscribe(() => {
    const deletedPlan = this.plans.find((plan) => plan._id === id);
    if (deletedPlan) {
      deletedPlan.active = false;
    }
  });
    
  }

  ngOnDestroy(): void {
    this.planAddedSubscription.unsubscribe();
  }

  getPlansToShow(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.plans.slice(startIndex, endIndex);
  }
  goToPage(pageNumber: number): void {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(this.totalPlans / this.pageSize)
    ) {
      this.currentPage = pageNumber;
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalPlans / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    const totalPages = Math.ceil(this.totalPlans / this.pageSize);
    return this.currentPage === totalPages;
  }
}

