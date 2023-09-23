import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tracking } from 'src/app/components/models/track.interface';


export const JWT_NAME = 'JWT_SECRET';

@Injectable({
  providedIn: 'root'
})

export class TrackingService {

  constructor(private http: HttpClient) { }   
  
  //   createTracking(track : Tracking)  {
  //     return this.http.post(`${this.JWT_NAME}/api/tracking/create`, track);
  //   }
}
