import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ColisData, ColisService } from 'src/app/services/colis-Service/colis.service';
import { Colis } from '../models/colis.interface';

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
  displayedColumns: string[] = ['id_colis', 'suivi_numero', 'statut', 'description', 'emplacement' , 'sender',  'recipient', 'transporteur'];

  constructor(private colisService: ColisService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.colisService.findAll(1, 10).pipe(
      tap(colis => console.log(colis)),
    ).subscribe((colisData: ColisData) => {
      this.dataSource = colisData;
    });
  }
  
  // initDataSource() {
  //   this.colisService.findAll(1, 10).pipe(
  //     tap(colis => console.log(colis)),
  //     map((colisData: ColisData) => this.dataSource = colisData)
  //   ).subscribe(); 
  // }

  onPaginateChange(event: number) {
    let page = event;
    let size = this.dataSource.meta.itemsPerPage;

      //page = page +1;
      this.colisService.findAll(page, size).pipe(
          map((colisData: ColisData) => this.dataSource = colisData)
      ).subscribe();
  
  } 

  navigateToProfile( id: number ) {
    this.router.navigate(['./' + id], {relativeTo: this.activatedRoute});
  }

  btnClick(){
    this.router.navigateByUrl('createColis');
  }

  toggleEdit(row: any) {
    row.editing = !row.editing;
  }

  updateColis(row: any) {
    // Implement your update logic here using the service
    // You might want to disable editing mode after updating
    this.colisService.updateOne(row).subscribe(
      (updatedRow: any) => {
        console.log('Colis updated:', updatedRow);
        row.editing = false; // Disable editing mode
        row.numero = updatedRow.numero;
      },
      error => {
        console.error('Error updating colis:', error);
      }
    );
  }


 
  
}
