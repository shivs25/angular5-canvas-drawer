import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataStoreService } from '../../services/data-store.service';

import { CalloutPointToolComponent } from './callout-point-tool.component';
import { MockDataStoreService } from '../../helpers/mocks';
import { DrCallout, createDrCallout } from '../../models/dr-callout';

describe('CalloutPointToolComponent', () => {
  let component: CalloutPointToolComponent;
  let fixture: ComponentFixture<CalloutPointToolComponent>;
  let dataService: MockDataStoreService;
  let callout: DrCallout = createDrCallout({ id: 1 });

  beforeEach(async(() => {
    dataService = new MockDataStoreService();
    spyOnProperty(dataService, "selectedObjects", "get").and.returnValue([callout]);

    TestBed.configureTestingModule({
      declarations: [CalloutPointToolComponent],
      providers: [{ provide: DataStoreService, useValue: dataService },
]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalloutPointToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
