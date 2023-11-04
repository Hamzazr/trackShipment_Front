import { Component, OnInit } from '@angular/core';

import { TrackResult } from '../models/TrackResultResponse';
import { TrackingRequest } from '../models/trackRequest';
import { ColisService } from 'src/app/services/colis-Service/colis.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  shipmentStatus: TrackResult;
  trackingNumbers: TrackingRequest;

  constructor(private trackingService: ColisService) {}

  ngOnInit() {
    this.onTrackShipment();
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
