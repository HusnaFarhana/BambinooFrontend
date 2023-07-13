import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';  
import { Router } from '@angular/router';
import { iStaffModel } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css'],
})
export class TutorsComponent implements OnInit {
  staffs: iStaffModel[];
  pageSize: number = 10;
  currentPage: number = 1;
  totalStaffs: number = 0;
  sortDirection: string = 'asc';
  constructor(public adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.adminService.getStaff().subscribe((response: any) => {
      this.staffs = response.staffs;
      console.log(this.staffs);
      this.totalStaffs = this.staffs.length;
    });
  }

  tutorprofile(id) {
    this.router.navigate(['tutors', 'tutorprofile', id]);
  }

  getStaffsToShow(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // return this.staffs.slice(startIndex, endIndex);
    const sortedStaffs = this.staffs.slice().sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (this.sortDirection === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    return sortedStaffs.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number): void {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(this.totalStaffs / this.pageSize)
    ) {
      this.currentPage = pageNumber;
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalStaffs / this.pageSize);
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
    const totalPages = Math.ceil(this.totalStaffs / this.pageSize);
    return this.currentPage === totalPages;
  }

  sortByName(): void {
    if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc';
    } else {
      this.sortDirection = 'asc';
    }
  }
  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
}
