import { TestBed } from '@angular/core/testing';

import { BookmarkService } from './bookmark';

describe('Bookmark', () => {
  let service:  BookmarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
