import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrImageComponent } from './dr-image.component';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';

describe('DrImageComponent', () => {
  let component: DrImageComponent;
  let fixture: ComponentFixture<DrImageComponent>;
  let objectService: any = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrImageComponent ],
      providers: [
        { provide: DrawerObjectHelperService, useValue: objectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
