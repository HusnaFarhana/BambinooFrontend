import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { iUserPayload,iKidModel } from 'src/app/shared/interfaces';
@Component({
  selector: 'app-mykids',
  templateUrl: './mykids.component.html',
  styleUrls: ['./mykids.component.css'],
})
export class MykidsComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
 
  
  userid: String = '';
  decoded: iUserPayload;
  token: any;
  empty: boolean = false;
  kids: iKidModel[];
  error = null;
  pageSize: number = 5; 
  currentPage: number = 1; 
  totalKids: number = 0; 

  ngOnInit(): void {
    this.token = localStorage.getItem('id_token');
    this.decoded = jwt_decode(this.token);
    this.userid = this.decoded.userid;

    this.userService.mykids(this.userid).subscribe(
      (response) => {
        
        this.kids = response.kid;
        this.totalKids = this.kids.length;

        if (this.kids.length === 0) {
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
    return this.kids.slice(startIndex, endIndex);
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
  kidprofile(id) {
    console.log(id,'hjkjk');
    
    this.router.navigate(['mykids/babyprofile', id]);
  }
}
