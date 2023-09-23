import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent implements OnInit{

  validateForm!: UntypedFormGroup;
  selectedLayout:string  ; 
  
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  get isHorizontal(): boolean {
    return this.validateForm.controls['formLayout']?.value === 'inline';
  }

  constructor(private fb: UntypedFormBuilder) {
    this.validateForm = this.fb.group({
      formLayout: ['inline']
      
    });
  }

  updateLayout(layout: string) {
    this.selectedLayout = layout;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      formLayout: ['inline'],
      fieldA: [null, [Validators.required]],
      filedB: [null, [Validators.required]]
    });
  }

  
}
