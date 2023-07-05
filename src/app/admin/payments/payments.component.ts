import { Component,OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  data: any;
  pageSize: number = 5;
  currentPage: number = 1;
  totalPlans: number = 0;
  isDateSortedAsc: boolean = true;

  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.getPayments().subscribe((response) => {
      this.data = response.data;
    });
  }

  getPlansToShow(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.data.slice(startIndex, endIndex);
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

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }

  sortTableByDate(): void {
    this.isDateSortedAsc = !this.isDateSortedAsc;
    this.data.sort((a: any, b: any) => {
      const dateA = new Date(a.subscription.date).getTime();
      const dateB = new Date(b.subscription.date).getTime();
      return this.isDateSortedAsc ? dateA - dateB : dateB - dateA;
    });
  }
}
