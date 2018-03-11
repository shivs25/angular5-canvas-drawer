import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrPolygonComponent } from './dr-polygon.component';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';

describe('DrPolygonComponent', () => {
  let component: DrPolygonComponent;
  let fixture: ComponentFixture<DrPolygonComponent>;
  let objectService: any = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrPolygonComponent ],
      providers: [
        { provide: DrawerObjectHelperService, useValue: objectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrPolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
