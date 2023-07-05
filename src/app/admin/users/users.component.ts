import { Component,OnInit } from '@angular/core';
import { userModel } from 'src/app/shared/interfaces';
import { AdminService } from 'src/app/shared/services/admin.service';  

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: userModel[];
  pageSize: number = 5;
  currentPage: number = 1;
  totalUsers: number = 0;
  sortDirection: string = 'asc';
  constructor(public adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.getUsers().subscribe((response: any) => {
      this.users = response.users;
      this.totalUsers = this.users.length;
    });
  }

  getUsersToShow(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // return this.users.slice(startIndex, endIndex);
    const sortedUsers = this.users.slice().sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (this.sortDirection === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    return sortedUsers.slice(startIndex, endIndex);
  }
  goToPage(pageNumber: number): void {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(this.totalUsers / this.pageSize)
    ) {
      this.currentPage = pageNumber;
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalUsers / this.pageSize);
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
    const totalPages = Math.ceil(this.totalUsers / this.pageSize);
    return this.currentPage === totalPages;
  }
  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
}
