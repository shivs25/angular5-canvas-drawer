import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataStoreService } from '../../services/data-store.service';

import { CalloutPointToolComponent } from './callout-point-tool.component';

describe('CalloutPointToolComponent', () => {
  let component: CalloutPointToolComponent;
  let fixture: ComponentFixture<CalloutPointToolComponent>;
  let dataService: any = {};
  beforeEach(async(() => {
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
