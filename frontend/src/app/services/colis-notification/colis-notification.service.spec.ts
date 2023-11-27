import { TestBed } from '@angular/core/testing';

import { ColisNotificationService } from '../colis-notification/colis-notification.service';

describe('ColisNotificationService', () => {
  let service: ColisNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColisNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
