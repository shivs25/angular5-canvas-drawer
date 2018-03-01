import { TestBed, inject } from '@angular/core/testing';

import { DataStoreService } from './data-store.service';
import { NgRedux } from '@angular-redux/store';

describe('DataStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataStoreService, NgRedux]
    });
  });

  it('should be created', inject([DataStoreService], (service: DataStoreService) => {
    expect(service).toBeTruthy();
  }));
});
