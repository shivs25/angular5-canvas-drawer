import { TestBed, inject } from '@angular/core/testing';

import { CustomComponentResolverService } from './custom-component-resolver.service';

describe('CustomComponentResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomComponentResolverService]
    });
  });

  it('should be created', inject([CustomComponentResolverService], (service: CustomComponentResolverService) => {
    expect(service).toBeTruthy();
  }));
});
