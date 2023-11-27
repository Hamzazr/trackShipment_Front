import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColisNotificationData, ColisNotificationService } from 'src/app/services/colis-notification/colis-notification.service';

@Component({
  selector: 'app-colis-notification',
  templateUrl: './colis-notification.component.html',
  styleUrls: ['./colis-notification.component.scss']
})
export class ColisNotificationComponent implements OnInit{

  @Input()
  colisId: number;
  notificationForm: FormGroup;
  colisNotification : ColisNotificationData;

  constructor(
    private formBuilder: FormBuilder,
    private colisNotificationService: ColisNotificationService,
    ) {

  }

  ngOnInit() {
    this.notificationForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      currentResultControl: [null],
      notifyOnDeliveryControl: [null],
      notifyOnEstimatedDeliveryDateChangeControl: [null],
      notifyOnExceptionControl: [null],
      notifyOnTenderedControl: [null]
    });

    this.colisNotificationService.getColisNotification(this.colisId).subscribe(
      (colisNotification: ColisNotificationData) => {
        console.log("### ", colisNotification)
        this.colisNotification = colisNotification;
        this.notificationForm.setValue({
          name: this.colisNotification.senderContactName, 
          email: this.colisNotification.senderContactEmail,
          currentResultControl: this.colisNotification.currentResult, 
          notifyOnDeliveryControl: this.colisNotification.notifyOnDelivery, 
          notifyOnEstimatedDeliveryDateChangeControl: this.colisNotification.notifyOnEstimatedDeliveryDateChange, 
          notifyOnExceptionControl: this.colisNotification.notifyOnException, 
          notifyOnTenderedControl: this.colisNotification.notifyOnTendered, 

        });
      }
    )
  }



  onSubmit() {
    console.log(this.notificationForm);

    if (this.notificationForm.valid) {
      console.log('Form submitted:', this.notificationForm.value);
      this.colisNotificationService.updateColisNotification(
        this.notificationForm.value, this.colisNotification.idNotification, this.colisNotification.colis.id_colis
      ).subscribe(
        response => {
          console.log('Colis Notif created:', response);
        },
        error => {
          console.error('Error creating colis:', error);
        }
      );
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
