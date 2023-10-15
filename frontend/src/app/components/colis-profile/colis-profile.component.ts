import { Component, TemplateRef } from '@angular/core';
import { NzMarks } from 'ng-zorro-antd/slider';
import { ColisService } from 'src/app/services/colis-Service/colis.service';
import { TrackResult } from '../models/TrackResultResponse';
import { TrackingRequest } from '../models/trackRequest';

@Component({
  selector: 'app-colis-profile',
  templateUrl: './colis-profile.component.html',
  styleUrls: ['./colis-profile.component.scss']
})
export class ColisProfileComponent {
  loading: boolean = false;
  shipmentStatus: TrackResult;
  trackingNumbers: TrackingRequest;

  constructor(private trackingService: ColisService) {}

  onTrackShipment() {
    this.trackingService.trackShipment(this.trackingNumbers).subscribe(
      (response) => {
        this.shipmentStatus = response;
        console.log(this.shipmentStatus);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
