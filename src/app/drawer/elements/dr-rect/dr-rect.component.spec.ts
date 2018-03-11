import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrRectComponent } from './dr-rect.component';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';

describe('DrRectComponent', () => {
  let component: DrRectComponent;
  let fixture: ComponentFixture<DrRectComponent>;
  let objectService: any = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrRectComponent ],
      providers: [
        { provide: DrawerObjectHelperService, useValue: objectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrRectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
