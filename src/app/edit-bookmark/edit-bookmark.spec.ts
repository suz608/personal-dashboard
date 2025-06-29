import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookmark } from './edit-bookmark';

describe('EditBookmark', () => {
  let component: EditBookmark;
  let fixture: ComponentFixture<EditBookmark>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBookmark]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBookmark);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
