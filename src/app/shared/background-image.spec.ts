import { TestBed } from '@angular/core/testing';

import { BackgroundImage } from './background-image';

describe('BackgroundImage', () => {
  let service: BackgroundImage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundImage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
