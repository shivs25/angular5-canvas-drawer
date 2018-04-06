import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrCalloutComponent } from './dr-callout.component';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';

describe('DrCalloutComponent', () => {
  let component: DrCalloutComponent;
  let fixture: ComponentFixture<DrCalloutComponent>;
  let objectService: any = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrCalloutComponent ],
      providers: [
        { provide: DrawerObjectHelperService, useValue: objectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrCalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
