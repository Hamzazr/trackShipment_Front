import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ColisService } from 'src/app/services/colis-Service/colis.service';
import { TrackResult } from '../models/TrackResultResponse';
import { TrackingRequest } from '../models/trackRequest';
import { MatDialog } from '@angular/material/dialog';
import { ColisNotificationComponent } from '../colis-notification/colis-notification.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { ColisNotificationData, ColisNotificationService } from 'src/app/services/colis-notification/colis-notification.service';
import { ActivatedRoute } from '@angular/router';
import { Colis } from '../models/colis.interface';

@Component({
  selector: 'app-colis-profile',
  templateUrl: './colis-profile.component.html',
  styleUrls: ['./colis-profile.component.scss'],
})
export class ColisProfileComponent implements OnInit {

  colis: Colis;
  colisId: number;

  email = '';
  loading: boolean = false;
  shipmentStatus: TrackResult;
  trackingNumbers: TrackingRequest;
  isVisible = false;
  showShimmer = true;

  constructor(
    private route: ActivatedRoute,
    private trackingService: ColisService,
    private colisNotificationService: ColisNotificationService,
  ) { }

  ngOnInit() {
    this.showShimmer = true;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.colisId = parseInt(id ?? "0");
      this.onTrackShipment(parseInt(id ?? "0"));
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  sendNotif() {
    this.colisNotificationService.getColisNotification(this.colisId).subscribe(
      async (colisNotification: ColisNotificationData) => {
        console.log("### ", this.email)
        await this.colisNotificationService.sendColisNotification(colisNotification, this.shipmentStatus.trackingNumber, this.email)
      }
    )
  }

  onKey(event:any) {
    this.email = event.target.value;
  }


  onTrackShipment(colisId: number) {
    this.trackingService.findOne(colisId).subscribe(
      (response) => {
        this.colis = response;
        const data = {
          "includeDetailedScans": false,
          "trackingInfo": [
              {
                  "trackingNumberInfo": {
                      "trackingNumber": response.trackingNumber
                  }
              }
          ]
       }
        this.trackingService.trackShipment(data).subscribe(
          (response) => {
            this.shipmentStatus = response.data;
            this.showShimmer = false;

            console.log(this.shipmentStatus);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );

  }
}
