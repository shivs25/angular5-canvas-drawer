import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrGroupedObjectComponent } from './dr-grouped-object.component';

describe('DrGroupedObjectComponent', () => {
  let component: DrGroupedObjectComponent;
  let fixture: ComponentFixture<DrGroupedObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrGroupedObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrGroupedObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
