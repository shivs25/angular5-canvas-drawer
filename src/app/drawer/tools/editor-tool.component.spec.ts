import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorToolComponent } from './editor-tool.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';

describe('EditorToolComponent', () => {
  let component: EditorToolComponent;
  let fixture: ComponentFixture<EditorToolComponent>;
  let dataService: any = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorToolComponent ],
      providers: [
        { provide: DataStoreService, useValue: dataService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
