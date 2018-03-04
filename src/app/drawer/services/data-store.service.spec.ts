import { TestBed, inject } from '@angular/core/testing';

import { DataStoreService } from './data-store.service';
import { NgRedux } from '@angular-redux/store';
import { DrawerObjectHelperService } from './drawer-object-helper.service';
import { ChangeHelperService  } from './change-helper.service';

describe('DataStoreService', () => {
  let objectHelperService: any = {};
  let changeService: any = {};
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataStoreService, NgRedux, 
        { provide: DrawerObjectHelperService, useValue: objectHelperService },
        { provide: ChangeHelperService, useValue: changeService }
      ]
    });
  });

  it('should be created', inject([DataStoreService], (service: DataStoreService) => {
    expect(service).toBeTruthy();
  }));
});
