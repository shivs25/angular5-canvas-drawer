import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCreationToolComponent } from './object-creation-tool.component';

describe('ObjectCreationToolComponent', () => {
  let component: ObjectCreationToolComponent;
  let fixture: ComponentFixture<ObjectCreationToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectCreationToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectCreationToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
