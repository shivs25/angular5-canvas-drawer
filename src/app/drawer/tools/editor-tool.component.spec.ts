import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorToolComponent } from './editor-tool.component';

describe('EditorToolComponent', () => {
  let component: EditorToolComponent;
  let fixture: ComponentFixture<EditorToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
