import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrRectComponent } from './dr-rect.component';

describe('DrRectComponent', () => {
  let component: DrRectComponent;
  let fixture: ComponentFixture<DrRectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrRectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrRectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
