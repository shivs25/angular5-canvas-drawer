import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrGroupedObjectComponent } from './dr-grouped-object.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';

describe('DrGroupedObjectComponent', () => {
  let component: DrGroupedObjectComponent;
  let fixture: ComponentFixture<DrGroupedObjectComponent>;
  let objectService: any = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrGroupedObjectComponent ],
      providers: [
        { provide: DrawerObjectHelperService, useValue: objectService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrGroupedObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
