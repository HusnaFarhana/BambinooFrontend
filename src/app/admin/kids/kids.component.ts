import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Router } from '@angular/router';
import { iKidModel } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css'],
})
export class KidsComponent implements OnInit {
  kids: iKidModel[];
  pageSize: number = 5;
  currentPage: number = 1;
  totalKids: number = 0;
  sortDirection: string = 'asc';
  constructor(public adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.adminService.getKids().subscribe((response: any) => {
      this.kids = response.kids;
      this.totalKids = this.kids.length;
    });
  }

  babyprofile(id) {
    this.router.navigate(['/admin/kids/profile', id]);
  }
  getKidsToShow(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // return this.kids.slice(startIndex, endIndex);
    const sortedKids = this.kids.slice().sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (this.sortDirection === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    return sortedKids.slice(startIndex, endIndex);
  }
  goToPage(pageNumber: number): void {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(this.totalKids / this.pageSize)
    ) {
      this.currentPage = pageNumber;
    }
  }
  nextPage(): void {
    const totalPages = Math.ceil(this.totalKids / this.pageSize);
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
    const totalPages = Math.ceil(this.totalKids / this.pageSize);
    return this.currentPage === totalPages;
  }
  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
}



