import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrTextComponent } from './dr-text.component';

describe('DrTextComponent', () => {
  let component: DrTextComponent;
  let fixture: ComponentFixture<DrTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
