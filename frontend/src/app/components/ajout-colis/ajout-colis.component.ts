import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ColisService } from 'src/app/services/colis-Service/colis.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';


@Component({
  selector: 'app-ajout-colis',
  templateUrl: './ajout-colis.component.html',
  styleUrls: ['./ajout-colis.component.scss']
})
export class AjoutColisComponent implements OnInit {

  ajoutform : FormGroup;
  phones: any[] = [];
  countries: any[] = [];
  selectedCountry: string = '';
  selectedPhone: string = '';

  constructor(
    private colisService : ColisService,
    private formBuilder : FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.ajoutform = this.formBuilder.group({
      numero : [null, [Validators.required]],
      statut : [null, [Validators.required]],
      description : [null, [Validators.required]],
      poids : [null, [Validators.required]],
      emplacement : [null, [Validators.required]],
      datePickerTime: [null],
      destination: [null]

    }),
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

  onCountryChange(country: string): void {
    console.log('Selected Country:', country);
  }
  onPhoneChange(phone: string): void {
    console.log('Selected Phone:', phone);
  }

  post() {
    this.colisService.post(this.ajoutform.getRawValue()).subscribe(
      response => {
        console.log('Colis created:', response);
      },
      error => {
        console.error('Error creating colis:', error);
      }
    );
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

}
