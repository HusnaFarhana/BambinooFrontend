import { Component ,OnInit} from '@angular/core';
import { StaffService } from 'src/app/shared/services/staff.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { iKidModel } from 'src/app/shared/interfaces'; 
import { iPayloadType } from 'src/app/shared/interfaces'; 

@Component({
  selector: 'app-mykids',
  templateUrl: './mykids.component.html',
  styleUrls: ['./mykids.component.css'],
})
export class MykidsComponent implements OnInit {
  staffid: string = '';
  token: any;
  decoded: iPayloadType;
  data: iKidModel[];
  error = null;
  empty: boolean = false;
  pageSize: number = 2;
  currentPage: number = 1;
  totalKids: number = 0;
  sortDirection: string = 'asc';
  constructor(private staffService: StaffService, private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('staff_token');
    this.decoded = jwt_decode(this.token);
    this.staffid = this.decoded.staffid;
    this.staffService.getKids(this.staffid).subscribe(
      (response) => {
        this.data = response.data;
        this.totalKids = this.data.length;
        if (this.data.length === 0) {
          this.empty = true;
        }
      },
      (error) => {
        this.error = error.message;
      }
    );
  }
  getKidsToShow(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const sortedKids = this.data.slice().sort((a, b) => {
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

  kidprofile(id) {
    this.router.navigate(['singlekid', id]);
  }
}

