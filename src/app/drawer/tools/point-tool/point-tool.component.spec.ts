import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointToolComponent } from './point-tool.component';

describe('PointToolComponent', () => {
  let component: PointToolComponent;
  let fixture: ComponentFixture<PointToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
