import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ColisService } from 'src/app/services/colis-Service/colis.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import {Country} from '@angular-material-extensions/select-country';


@Component({
  selector: 'app-ajout-colis',
  templateUrl: './ajout-colis.component.html',
  styleUrls: ['./ajout-colis.component.scss']
})
export class AjoutColisComponent implements OnInit {

  AddColis : FormGroup;
  AddRecipient : FormGroup;
  
  phones: any[] = [];
  countries: any[] = [];
  selectedCountry: string = '';
  selectedPhone: string = '';

  constructor(
    private colisService : ColisService,
    private formBuilder : FormBuilder,
    private router: Router,
    
  ){  }

  ngOnInit(): void {

   

    this.AddColis = this.formBuilder.group({

      Tracking_Number : [null, [Validators.required]],
      title : [null, [Validators.required]],
      Origine_Country : [null, [Validators.required]],
      Destination_Country : [null, [Validators.required]],
      shipping_Date : [null, [Validators.required]],
      Order_Number : [null, [Validators.required]],
      
    }),

    this.AddRecipient = this.formBuilder.group({
      Name : [null, [Validators.required]],
      CodePostal : [null, [Validators.required]],
      NumTel : [null, [Validators.required]],
      Email : [null, [Validators.required]],
    });

      
    this.colisService.loadJsonData().subscribe(
      (data: any) => {
        this.countries = data;
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

    // const inputElement = document.getElementById('#phone');
    // if (inputElement) {
    //   intlTelInput(inputElement, {
    //     initialCountry: 'US',
    //     separateDialCode:true,
    //     utilsScript: 'http://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.0/js/utils.js'
    //   });
    // }
  }


  onCountrySelected($event: Country) {
    console.log($event);
  }

  onCountryChange(country: string): void {
    console.log('Selected Country:', country);
  }
  onPhoneChange(phone: string): void {
    console.log('Selected Phone:', phone);
  }

  post() {
    this.colisService.post(this.AddColis.getRawValue()).subscribe(
      response => {
        console.log('Colis created:', response);
      },
      error => {
        console.error('Error creating colis:', error);
      }
    );
  }

// Country

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
  { name: 'DHL', logoUrl: 'https://www.cleanpng.com/png-dhl-express-courier-business-delivery-mail-dhl-5116867/' },
  // Add more courier options with logos here
];

selectedCourier: string | null = null;

//----------------------------------------------------------


}



