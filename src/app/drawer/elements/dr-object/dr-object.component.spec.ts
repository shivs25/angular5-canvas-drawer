import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrObjectComponent } from './dr-object.component';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';

describe('DrObjectComponent', () => {
  let component: DrObjectComponent;
  let fixture: ComponentFixture<DrObjectComponent>;
  let objectService: any = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrObjectComponent ],
      providers: [
        { provide: DrawerObjectHelperService, useValue: objectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
