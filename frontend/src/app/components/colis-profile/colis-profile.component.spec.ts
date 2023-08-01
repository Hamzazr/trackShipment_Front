import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColisProfileComponent } from './colis-profile.component';

describe('ColisProfileComponent', () => {
  let component: ColisProfileComponent;
  let fixture: ComponentFixture<ColisProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColisProfileComponent]
    });
    fixture = TestBed.createComponent(ColisProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
