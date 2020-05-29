import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmobPage } from './admob.page';

describe('AdmobPage', () => {
  let component: AdmobPage;
  let fixture: ComponentFixture<AdmobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmobPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
