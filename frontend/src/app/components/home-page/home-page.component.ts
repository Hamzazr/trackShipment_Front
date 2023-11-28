import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentification-Service/auth.service';
import { TrackResult } from '../models/TrackResultResponse';
import { TrackingService } from 'src/app/services/tracking-Service/tracking.service';
import { ColisService } from 'src/app/services/colis-Service/colis.service';
import { TrackingRequest } from '../models/trackRequest';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  shipmentStatus: TrackResult;
  trackingNumbers: TrackingRequest;
  isCollapse: boolean;
  controlTrackNumber =new FormControl()
  controlEmail =new FormControl()


  constructor(
    private colisService: ColisService,
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

  sendNotif() {
    
  }

  toggleCollapse() {
    this.isCollapse = !this.isCollapse
  }

  onSearch() {
    this.onTrackShipment()
  }

  onTrackShipment() {
    if (this.controlTrackNumber.value !== "") {
      const data = {
        "includeDetailedScans": false,
        "trackingInfo": [
            {
                "trackingNumberInfo": {
                    "trackingNumber": this.controlTrackNumber.value
                }
            }
        ]
     }
      this.colisService.trackShipment(data).subscribe(
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

}
