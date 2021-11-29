import { TestBed } from '@angular/core/testing';

import { PasswordEncryptorService } from './password-encryptor.service';

describe('PasswordEncryptorService', () => {
  let service: PasswordEncryptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordEncryptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
