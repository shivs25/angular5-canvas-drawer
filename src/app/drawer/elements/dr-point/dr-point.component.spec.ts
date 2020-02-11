import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrPointComponent } from './dr-point.component';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';

describe('DrPointComponent', () => {
  let component: DrPointComponent;
  let fixture: ComponentFixture<DrPointComponent>;
  let objectService: any = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrPointComponent ],
      providers: [
        { provide: DrawerObjectHelperService, useValue: objectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
