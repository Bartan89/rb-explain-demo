import { TestBed } from '@angular/core/testing';

import { FetchCatServiceService } from './fetch-cat-service.service';

describe('FetchCatServiceService', () => {
  let service: FetchCatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchCatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
