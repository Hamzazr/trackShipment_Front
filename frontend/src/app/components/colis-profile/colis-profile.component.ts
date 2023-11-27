import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ColisService } from 'src/app/services/colis-Service/colis.service';
import { TrackResult } from '../models/TrackResultResponse';
import { TrackingRequest } from '../models/trackRequest';
import { MatDialog } from '@angular/material/dialog';
import { ColisNotificationComponent } from '../colis-notification/colis-notification.component';
import { FormBuilder } from '@angular/forms';
import { ColisNotificationData, ColisNotificationService } from 'src/app/services/colis-notification/colis-notification.service';

@Component({
  selector: 'app-colis-profile',
  templateUrl: './colis-profile.component.html',
  styleUrls: ['./colis-profile.component.scss'],
})
export class ColisProfileComponent implements OnInit {

  colisId: number;
  email: string;
  loading: boolean = false;
  shipmentStatus: TrackResult;
  trackingNumbers: TrackingRequest;
  isVisible = false;

  constructor(
    private trackingService: ColisService,
    private colisNotificationService: ColisNotificationService,
  ) { }

  ngOnInit() {
    this.colisId = 1;
    this.onTrackShipment();
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
        console.log("### ", colisNotification)
        await this.colisNotificationService.sendColisNotification(colisNotification, this.shipmentStatus.trackingNumber, this.email)
      }
    )
  }

  onTrackShipment() {
    this.trackingService.trackShipment(this.trackingNumbers).subscribe(
      (response) => {
        this.shipmentStatus = response.data;
        console.log(this.shipmentStatus);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
