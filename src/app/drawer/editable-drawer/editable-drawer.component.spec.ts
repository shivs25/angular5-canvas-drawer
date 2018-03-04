import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableDrawerComponent } from './editable-drawer.component';
import { NO_ERRORS_SCHEMA, EventEmitter } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';
import { DrObject } from '../models/dr-object';

describe('EditableDrawerComponent', () => {
  let component: EditableDrawerComponent;
  let fixture: ComponentFixture<EditableDrawerComponent>;
  let dataService: any = {
    selectionChanged: new EventEmitter<DrObject[]>(),
    editingChanged: new EventEmitter<boolean>(),
    objectsAdded: new EventEmitter<DrObject[]>()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableDrawerComponent ],
      providers: [
        { provide: DataStoreService, useValue: dataService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
