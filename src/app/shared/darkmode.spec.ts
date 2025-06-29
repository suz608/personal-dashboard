import { TestBed } from '@angular/core/testing';
import { DarkmodeService } from './darkmode';

describe('Darkmode', () => {
  let service: DarkmodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkmodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
