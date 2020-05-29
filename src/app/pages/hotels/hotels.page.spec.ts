import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsPage } from './hotels.page';

describe('HotelsPage', () => {
  let component: HotelsPage;
  let fixture: ComponentFixture<HotelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
