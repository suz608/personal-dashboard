import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookmarks } from './manage-bookmarks';

describe('ManageBookmarks', () => {
  let component: ManageBookmarks;
  let fixture: ComponentFixture<ManageBookmarks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBookmarks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBookmarks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
