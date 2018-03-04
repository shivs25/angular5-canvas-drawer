import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCreationToolComponent } from './object-creation-tool.component';
import { DataStoreService } from '../../services/data-store.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('ObjectCreationToolComponent', () => {
  let component: ObjectCreationToolComponent;
  let fixture: ComponentFixture<ObjectCreationToolComponent>;
  let dataService: any = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectCreationToolComponent ],
      providers: [
        { provide: DataStoreService, useValue: dataService }
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
