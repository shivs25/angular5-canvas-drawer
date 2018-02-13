import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorToolComponent } from './selector-tool.component';

describe('SelectorToolComponent', () => {
  let component: SelectorToolComponent;
  let fixture: ComponentFixture<SelectorToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
