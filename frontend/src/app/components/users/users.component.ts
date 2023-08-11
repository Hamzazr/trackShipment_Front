import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { UserData, UserService } from 'src/app/services/user-Service/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  dataSource: UserData = {
    items: [],
    meta: {
      totalItems: 0,
      itemCount: 0, 
      itemsPerPage: 0,
      totalPages: 0,
      currentPage: 0
    },
    links: {
      first: '',
      previous: '',
      next: '',
      last: ''
    }
  }; 

  pageEvent: PageEvent;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'adresse', 'ville', 'email'];

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  
  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.userService.findAll(1, 10).pipe(
      tap(users => console.log(users)),
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe(); 
  }

  onPaginateChange(event: number) {
    // let page = event.pageIndex;
    // let size = event.pageSize;
    let page = event;
    let size = this.dataSource.meta.itemsPerPage;

      //page = page +1;
      this.userService.findAll(page, size).pipe(
          map((userData: UserData) => this.dataSource = userData)
      ).subscribe();
  
  }

  navigateToProfile( id: number ) {
    this.router.navigate(['./' + id], {relativeTo: this.activatedRoute});
  }

}
