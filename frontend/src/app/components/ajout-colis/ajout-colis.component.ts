import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ColisService } from 'src/app/services/colis-Service/colis.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Country } from '@angular-material-extensions/select-country';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

interface IModalData {
  colisToEdit: any;
  onColisUpdated: (data:any) => void;
}

@Component({
  selector: 'app-ajout-colis',
  templateUrl: './ajout-colis.component.html',
  styleUrls: ['./ajout-colis.component.scss']
})
export class AjoutColisComponent implements OnInit {

  colisForm: FormGroup;
  phones: any[] = [];
  countries: any[] = [];
  countryOrigin:any;
  countryDestination:any;

  colisToEdit: any;
  @Output() onColisCreated: EventEmitter<any> = new EventEmitter();
  nzModalData?: IModalData;


  constructor(
    private colisService: ColisService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    try {
      this.nzModalData = inject(NZ_MODAL_DATA);
    } catch (error) {
      console.error(error);
    }
    
    if(this.nzModalData){
      this.colisToEdit = this.nzModalData.colisToEdit;
    }
    console.log("colisToEdit, ", this.colisToEdit)
    if (this.colisToEdit) {
      let recipient = this.colisToEdit["recipient"];
      this.colisForm = this.formBuilder.group({
        cTrackingNumber: [this.colisToEdit["trackingNumber"], [Validators.required]],
        cTitle: [this.colisToEdit["title"]],
        cCountryOrigin: [null],
        cCountryDestination: [null],
        cTransporter: [this.courierOptions[0].name],
        cOrderNumber: [this.colisToEdit["orderNumber"],],
        cRecipientName: [recipient["name"],],
        cRecipientCodePostal: [recipient["codePostal"],],
        cRecipientNumTel: [recipient["phone"],],
        cRecipientEmail: [recipient["email"],],
      })
    } else {
      this.colisForm = this.formBuilder.group({
        cTrackingNumber: [null, [Validators.required]],
        cTitle: [null],
        cCountryOrigin: [null],
        cCountryDestination: [null],
        cTransporter: [null],
        cOrderNumber: [null,],
        cRecipientName: [null],
        cRecipientCodePostal: [null,],
        cRecipientNumTel: [null,],
        cRecipientEmail: [null,],
      })
    }

    this.colisService.loadJsonData().subscribe(
      (data: any) => {
        this.countries = data;
        if (this.colisToEdit) {

          this.countryOrigin = this.countries.find((element) => element["code"] == this.colisToEdit["countryOrigin"])
          this.countryDestination = this.countries.find((element) => element["code"] == this.colisToEdit["countryDestination"])

          this.colisForm.patchValue({
            cCountryOrigin: this.countryOrigin.code,
            cCountryDestination: this.countryDestination.code
          })
        }
      },
      error => {
        console.error('Error loading JSON data:', error);
      }
    );

    this.colisService.loadJsonData2().subscribe(
      (data: any) => {
        this.phones = data;
      },
      error => {
        console.error('Error loading JSON data:', error);
      }
    );

  }

  submitForm() {
    if (this.colisForm.valid) {
      const value = this.colisForm.value;
      const dataObject = {
        id_colis: this.colisToEdit ? this.colisToEdit["id_colis"] : null,
        trackingNumber: this.colisForm.value.cTrackingNumber,
        countryOrigin: this.colisForm.value.cCountryOrigin,
        countryDestination: this.colisForm.value.cCountryDestination,
        title: this.colisForm.value.cTitle,
        orderNumber: this.colisForm.value.cOrderNumber,
        transporteur: {
          nom: "FedEx"
        },
        recipient: {
          name: value.cRecipientName, // Replace with your actual name value
          phone: value.cRecipientNumTel, // Replace with your actual phone value
          email: value.cRecipientEmail, // Replace with your actual email value
          codePostal: value.cRecipientCodePostal,
        },
        user: {
          id: 1,
        }
      };

     
      this.colisService.post(dataObject).subscribe(
        response => {
          if(this.nzModalData) {
            this.nzModalData.onColisUpdated(response);
          } else {
            this.onColisCreated.emit(response);
          }
        },
        error => {
          console.error('Error creating colis:', error);
        }
      );
    } else {
      console.log("Invalid form")
    }
  }

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required])
  });

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }


  //Courrier

  courierOptions = [
    { name: 'FedEx', logoUrl: 'https://www.cleanpng.com/png-fedex-courier-express-mail-freight-transport-unite-3028973/' },
    // { name: 'DHL', logoUrl: 'https://www.cleanpng.com/png-dhl-express-courier-business-delivery-mail-dhl-5116867/' },
    // Add more courier options with logos here
  ];


}



