import { TestBed } from '@angular/core/testing';

import { AuthguardAdminGuard } from './authguard-admin.guard';

describe('AuthguardAdminGuard', () => {
  let guard: AuthguardAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthguardAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
