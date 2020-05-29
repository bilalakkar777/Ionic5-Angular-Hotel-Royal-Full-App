import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHotelsPage } from './edit-hotels.page';

describe('EditHotelsPage', () => {
  let component: EditHotelsPage;
  let fixture: ComponentFixture<EditHotelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHotelsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHotelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
