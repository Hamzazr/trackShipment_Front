import { Component, OnInit } from '@angular/core';

import { TrackResult } from '../models/TrackResultResponse';
import { TrackingRequest } from '../models/trackRequest';
import { ColisService } from 'src/app/services/colis-Service/colis.service';
import { AuthService } from 'src/app/services/authentification-Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  shipmentStatus: TrackResult;
  trackingNumbers: TrackingRequest;

  constructor(private router: Router,private trackingService: ColisService, private authService: AuthService) {}

  ngOnInit() {
    this.onTrackShipment();
  }

  navigateToRecipient() {
    this.router.navigate(['/recipient']);
  }

  logout() {
    this.authService.logout();
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
