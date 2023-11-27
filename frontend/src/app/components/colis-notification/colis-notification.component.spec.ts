import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColisNotificationComponent } from './colis-notification.component';

describe('ColisNotificationComponent', () => {
  let component: ColisNotificationComponent;
  let fixture: ComponentFixture<ColisNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColisNotificationComponent]
    });
    fixture = TestBed.createComponent(ColisNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
