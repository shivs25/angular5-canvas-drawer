import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableDrawerComponent } from './editable-drawer.component';

describe('EditableDrawerComponent', () => {
  let component: EditableDrawerComponent;
  let fixture: ComponentFixture<EditableDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
