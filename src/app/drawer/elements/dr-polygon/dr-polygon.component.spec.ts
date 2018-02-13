import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrPolygonComponent } from './dr-polygon.component';

describe('DrPolygonComponent', () => {
  let component: DrPolygonComponent;
  let fixture: ComponentFixture<DrPolygonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrPolygonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrPolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
