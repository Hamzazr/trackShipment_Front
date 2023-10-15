import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { User } from '../../components/models/user.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-Service/user.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ColisService } from 'src/app/services/colis-Service/colis.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  userId: number | null  = null; 
  private sub: Subscription;
  user: User | null = null;
  countries: any[] = [];
  selectedCountry: string = '';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private colisService : ColisService,
    private userService : UserService 
    ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.userId = parseInt(params['id']);
      this.userService.findOne(this.userId).pipe(
        map((user : User) => this.user = user )
      ).subscribe()
    }); 


    this.colisService.loadJsonData().subscribe(
      (data: any) => {
        this.countries = data;
      },
      error => {
        console.error('Error loading JSON data:', error);
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  

  onCountryChange(country: string): void {
    console.log('Selected Country:', country);
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
