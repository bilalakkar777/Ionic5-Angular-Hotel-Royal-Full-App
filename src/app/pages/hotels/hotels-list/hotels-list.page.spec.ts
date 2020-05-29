import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsListPage } from './hotels-list.page';

describe('HotelsListPage', () => {
  let component: HotelsListPage;
  let fixture: ComponentFixture<HotelsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
