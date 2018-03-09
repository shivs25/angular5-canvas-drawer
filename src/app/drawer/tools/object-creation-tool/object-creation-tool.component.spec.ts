import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCreationToolComponent } from './object-creation-tool.component';
import { DataStoreService } from '../../services/data-store.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeHelperService } from '../../services/change-helper.service';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';


describe('ObjectCreationToolComponent', () => {
  let component: ObjectCreationToolComponent;
  let fixture: ComponentFixture<ObjectCreationToolComponent>;
  let dataService: any = {};
  let changeService: any = {};
  let objectService: any = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectCreationToolComponent ],
      providers: [
        { provide: DataStoreService, useValue: dataService },
        { provide: ChangeHelperService, useValue: changeService },
        { provide: DrawerObjectHelperService, useValue: objectService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
