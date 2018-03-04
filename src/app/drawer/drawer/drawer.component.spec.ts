import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerComponent } from './drawer.component';
import { DynamicSvgDirective } from '../dynamic-svg/dynamic-svg.directive';
import { NgRedux } from '@angular-redux/store';
import { DataStoreService } from '../services/data-store.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;
  let dataService: any = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerComponent, DynamicSvgDirective ],
      providers: [
        { provide: DataStoreService, useValue: dataService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
