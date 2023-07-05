import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { planModel } from 'src/app/shared/interfaces'; 

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
})
export class PlansComponent implements OnInit, OnDestroy {
  showDeleteConfirmationModal: boolean = false;
  plans: planModel[];
  pageSize: number = 2; 
  currentPage: number = 1; 
  totalPlans: number = 0; 
  private planAddedSubscription: Subscription;
  private editPlanSubscription: Subscription;

  constructor(
    public adminService: AdminService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.planAddedSubscription = this.adminService.planAdded$.subscribe(
      (plan) => {
        this.plans.push(plan);
      }
    );
    //  this.editPlanSubscription = this.adminService.editPlan$.subscribe(
    //    (plan) => {
    //      const index = this.plans.findIndex((p) => p._id === plan._id);
    //      if (index !== -1) {
    //        const updatedPlans = [...this.plans];
    //        updatedPlans[index] = plan;

    //        setTimeout(() => {
    //          this.plans = updatedPlans;
    //          this.changeDetectionRef.detectChanges();
    //        }, 0);
    //      }
    //    }
    //  );
    this.adminService.getPlans().subscribe((response: any) => {
      this.plans = response.plans;
      this.totalPlans = this.plans.length;

      console.log(this.plans,'pleeeens');
    });
  }
  showConfirmationModal() {
    console.log('clickedd');

    this.showDeleteConfirmationModal = true;
  }
  cancelDelete() {
    this.showDeleteConfirmationModal = false;
    console.log('cancelled');
  }
  confirmDelete() {
    this.showDeleteConfirmationModal = false;
    console.log('deleted');
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

