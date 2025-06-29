import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkTile } from './bookmark-tile';

describe('BookmarkTile', () => {
  let component: BookmarkTile;
  let fixture: ComponentFixture<BookmarkTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
