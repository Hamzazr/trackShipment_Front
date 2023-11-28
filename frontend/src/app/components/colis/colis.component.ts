import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ColisData, ColisService } from 'src/app/services/colis-Service/colis.service';
import { Colis } from '../models/colis.interface';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AjoutColisComponent } from '../ajout-colis/ajout-colis.component';
let paginationMax = 10;
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-colis',
  templateUrl: './colis.component.html',
  styleUrls: ['./colis.component.scss'],
})


export class ColisComponent implements OnInit {

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
  isColisAddVisible = false;
  isColisUpdateVisible = false;
  confirmModal?: NzModalRef; // For testing by now


  constructor(
    private modalService: NzModalService,
    private colisService: ColisService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  onColisCreated(colis: any) {
    this.dataSource.items.unshift(colis)
  }

  onColisUpdated(colis: any) {
    var index = this.dataSource.items.findIndex((element) => element["id_colis"] == colis["id_colis"]);
    this.dataSource.items[index] = colis;
    this.dataSource.items = Object.assign([], this.dataSource.items);
  }

  openColis(colis: any) {
    this.router.navigate(['./' + colis["id_colis"]], { relativeTo: this.activatedRoute });
  }

  initDataSource() {
    this.colisService.findAll(1, paginationMax).pipe(
      tap(colis => console.log(colis)),
    ).subscribe((colisData: ColisData) => {
      this.dataSource = colisData;
      this.dataSource.items.forEach(row => {
        this.fetchAdditionalDataAndUpdateRow(row);
      });
    });
  }

  fetchAdditionalDataAndUpdateRow(row: any): void {
    const data = {
      "includeDetailedScans": false,
      "trackingInfo": [
          {
              "trackingNumberInfo": {
                  "trackingNumber": row["trackingNumber"]
              }
          }
      ]
   }
    this.colisService.trackShipment(data).subscribe(
      additionalData => {
        row["status"] = additionalData.data.events[additionalData.data.events.length - 1].derivedStatus; // Adjust the property based on your actual data
      },
      error => {
        console.error('Error fetching additional data:', error);
        // Handle errors as needed
      }
    );
  }

  onPaginateChange(event: number) {
    let page = event;
    let size = this.dataSource.meta.itemsPerPage;
    this.colisService.findAll(page, size).pipe(
      map((colisData: ColisData) => this.dataSource = colisData)
    ).subscribe(
      response => {
        this.dataSource.items.forEach(row => {
          this.fetchAdditionalDataAndUpdateRow(row);
        });
      }
    );
  }

  deleteColis(colis: any) {
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzOnOk: () => {
        this.colisService.deleteOne(colis["id_colis"]).subscribe(
          response => {
            console.error('response:', response);
            this.dataSource.items = this.dataSource.items.filter(item => item["id_colis"] != colis["id_colis"]);
          },
          error => {
            console.error('Error creating colis:', error);
          }
        )
      },
    });
  }

  showAddColis(): void {
    this.isColisAddVisible = true;
  }

  addColisOk(): void {
    this.isColisAddVisible = false;
  }

  addColisCancel(): void {
    this.isColisAddVisible = false;
  }

  toggleEdit(colis: any) {
    this.modalService.create({
      nzContent: AjoutColisComponent,
      nzFooter: null,
      nzWidth: '80%',
      nzData: {
        colisToEdit: colis,
        onColisUpdated: this.onColisUpdated.bind(this)
      },
    });
  }

  updateColis(row: any) {

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
