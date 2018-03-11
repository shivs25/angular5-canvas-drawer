import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditToolComponent } from './text-edit-tool.component';

describe('TextEditToolComponent', () => {
  let component: TextEditToolComponent;
  let fixture: ComponentFixture<TextEditToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextEditToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
