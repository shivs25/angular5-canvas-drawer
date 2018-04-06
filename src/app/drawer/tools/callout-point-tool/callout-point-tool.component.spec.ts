import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalloutPointToolComponent } from './callout-point-tool.component';

describe('CalloutPointToolComponent', () => {
  let component: CalloutPointToolComponent;
  let fixture: ComponentFixture<CalloutPointToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalloutPointToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalloutPointToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
