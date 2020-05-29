import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesPage } from './languages.page';

describe('LanguagesPage', () => {
  let component: LanguagesPage;
  let fixture: ComponentFixture<LanguagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
