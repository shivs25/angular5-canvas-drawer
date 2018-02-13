import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrEllipseComponent } from './dr-ellipse.component';

describe('DrEllipseComponent', () => {
  let component: DrEllipseComponent;
  let fixture: ComponentFixture<DrEllipseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrEllipseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrEllipseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
