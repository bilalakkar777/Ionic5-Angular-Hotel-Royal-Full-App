import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationsPage } from './animations.page';

describe('AnimationsPage', () => {
  let component: AnimationsPage;
  let fixture: ComponentFixture<AnimationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
