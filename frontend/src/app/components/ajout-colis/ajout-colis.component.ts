import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ColisService } from 'src/app/services/colis-Service/colis.service';


@Component({
  selector: 'app-ajout-colis',
  templateUrl: './ajout-colis.component.html',
  styleUrls: ['./ajout-colis.component.scss']
})
export class AjoutColisComponent implements OnInit {

  ajoutform : FormGroup;

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
      emplacement : [null, [Validators.required]]

    })
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

  
}
