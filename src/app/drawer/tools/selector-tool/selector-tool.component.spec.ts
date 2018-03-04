import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorToolComponent } from './selector-tool.component';
import { DataStoreService } from '../../services/data-store.service';
import { ChangeHelperService } from '../../services/change-helper.service';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
import { NO_ERRORS_SCHEMA, EventEmitter } from '@angular/core';
import { DrObject } from '../../models/dr-object';


describe('SelectorToolComponent', () => {
  let component: SelectorToolComponent;
  let fixture: ComponentFixture<SelectorToolComponent>;

  let dataStore: any = {
    selectionChanged: new EventEmitter<DrObject[]>(),
    editingChanged: new EventEmitter<boolean>(),
    objectsAdded: new EventEmitter<DrObject[]>(),
    redid: new EventEmitter<any>(),
    undid: new EventEmitter<any>(),
    selectedObjects: [],
    selectedBounds: null
  };
  let objectService: any = {};
  let changeService: any = {};
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorToolComponent ],
      providers: [
        { provide: DataStoreService, useValue: dataStore },
        { provide: DrawerObjectHelperService, useValue: objectService },
        { provide: ChangeHelperService, useValue: changeService }

      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(dataStore, "selectedObjects").and.returnValue([]);

    fixture = TestBed.createComponent(SelectorToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {

    expect(component).toBeTruthy();
  });
});
