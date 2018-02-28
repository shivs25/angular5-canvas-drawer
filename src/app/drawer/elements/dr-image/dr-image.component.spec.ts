import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrImageComponent } from './dr-image.component';

describe('DrImageComponent', () => {
  let component: DrImageComponent;
  let fixture: ComponentFixture<DrImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
