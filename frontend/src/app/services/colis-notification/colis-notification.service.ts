import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, catchError, firstValueFrom, map, throwError } from 'rxjs';
import { Colis } from 'src/app/components/models/colis.interface';
import { ColisData } from '../colis-Service/colis.service';
export const JWT_NAME = 'JWT_SECRET';


export interface ColisNotificationData {
  colis: {
    id_colis: number
  };
  senderContactName: string;
  senderContactEmail: string;
  currentResult: boolean;
  notifyOnDelivery: boolean;
  notifyOnEstimatedDeliveryDateChange: boolean;
  notifyOnException: boolean;
  notifyOnTendered: boolean;
  idNotification: number;

}

@Injectable({
  providedIn: 'root'
})
export class ColisNotificationService {
  private apiUrl = 'https://apis-sandbox.fedex.com/oauth/token';


  constructor(private http: HttpClient) { }

  updateColisNotification(control: any, notifId: number, colisId: number): Observable<any> {
    // const token = localStorage.getItem(JWT_NAME);
    const payload = {
      "idNotification": notifId,
      "senderContactName": control.name,
      "senderContactEmail": control.email,
      "currentResult": control.currentResultControl,
      "notifyOnDelivery": control.notifyOnDeliveryControl,
      "notifyOnEstimatedDeliveryDateChange": control.notifyOnEstimatedDeliveryDateChangeControl,
      "notifyOnException": control.notifyOnExceptionControl,
      "notifyOnTendered": control.notifyOnTenderedControl,
      "colis": {
        "id_colis": colisId
        // Add more tracking properties as needed
      }
    };
    // if (!token) {
    //   throw new Error('JWT token not found.');
    // }

    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}` // Use the actual JWT token
    // });

    return this.http.post<ColisNotificationData>('/api/colis/notification', payload, {});

  }

  async sendColisNotification(data: ColisNotificationData,trackingNumber: string, email: string){
    // const token = localStorage.getItem(JWT_NAME);
    let notificationEventTypes = [];
    if(data.notifyOnTendered) {
      notificationEventTypes.push("ON_TENDER")
    }

    if(data.notifyOnDelivery) {
      notificationEventTypes.push("ON_DELIVERY")
    }

    if(data.notifyOnException) {
      notificationEventTypes.push("ON_EXCEPTION")
    }

    if(data.notifyOnEstimatedDeliveryDateChange) {
      notificationEventTypes.push("ON_ESTIMATED_DELIVERY")
    }

    const payload = {
      "senderContactName": data.senderContactName,
      "senderEMailAddress": data.senderContactEmail,
      "trackingEventNotificationDetail": {
        "trackingNotifications": [
          {
            "notificationDetail": {
              "localization": {
                "languageCode": "en",
                "localeCode": "US"
              },
              "emailDetail": {
                "emailAddress":email,
                "name": "Unknown"
              },
              "notificationType": "HTML"
            },
            "notificationEventTypes": notificationEventTypes,
            "currentResultRequestedFlag": data.currentResult
          }
        ],
        "trackingNumberInfo":{
          "trackingNumber" : trackingNumber
        }
      },

    };

    this.http.post<any>('api/colis/notification/send', payload, {}).subscribe();

  }

  getColisNotification(colisId: number): Observable<ColisNotificationData> {

    return this.http.get('/api/colis/notification/' + encodeURIComponent(colisId),).pipe(
      map((colisNotification: Object) => colisNotification as ColisNotificationData),
      catchError(err => throwError(err))
    )
  }

   async authToken(): Promise<string> {
    try{
      return await firstValueFrom(this.http.get('/api/tracking/token',{responseType: 'text'}));
    }catch(error){
      console.log('error',error)
      throw error;
    }
  }
}
