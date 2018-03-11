import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrEllipseComponent } from './dr-ellipse.component';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';

describe('DrEllipseComponent', () => {
  let component: DrEllipseComponent;
  let fixture: ComponentFixture<DrEllipseComponent>;
  let objectService: any = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrEllipseComponent ],
      providers: [
        { provide: DrawerObjectHelperService, useValue: objectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrEllipseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
