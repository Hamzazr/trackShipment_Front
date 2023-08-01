import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { ColisData, ColisService } from 'src/app/services/colis-Service/colis.service';

@Component({
  selector: 'app-colis',
  templateUrl: './colis.component.html',
  styleUrls: ['./colis.component.scss']
})
export class ColisComponent implements OnInit{

 
  dataSource: ColisData = {
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
  displayedColumns: string[] = ['id', 'numero', 'statut', 'transporteur', 'client'];

  constructor(private colisService: ColisService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initDataSource();
  }
  
  initDataSource() {
    this.colisService.findAll(1, 10).pipe(
      tap(colis => console.log(colis)),
      map((colisData: ColisData) => this.dataSource = colisData)
    ).subscribe(); 
  }

  onPaginateChange(event: number) {
    let page = event;
    let size = this.dataSource.meta.itemsPerPage;

      //page = page +1;
      this.colisService.findAll(page, size).pipe(
          map((userData: ColisData) => this.dataSource = userData)
      ).subscribe();
  
  }

  navigateToProfile( id: number ) {
    this.router.navigate(['./' + id], {relativeTo: this.activatedRoute});
  }

  
  
}
