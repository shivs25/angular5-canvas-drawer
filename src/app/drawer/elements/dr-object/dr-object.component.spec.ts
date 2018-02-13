import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrObjectComponent } from './dr-object.component';

describe('DrObjectComponent', () => {
  let component: DrObjectComponent;
  let fixture: ComponentFixture<DrObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
