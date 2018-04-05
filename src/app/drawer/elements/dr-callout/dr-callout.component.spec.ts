import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrCalloutComponent } from './dr-callout.component';

describe('DrCalloutComponent', () => {
  let component: DrCalloutComponent;
  let fixture: ComponentFixture<DrCalloutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrCalloutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrCalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
