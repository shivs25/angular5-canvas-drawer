import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrTextComponent } from './dr-text.component';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';

describe('DrTextComponent', () => {
  let component: DrTextComponent;
  let fixture: ComponentFixture<DrTextComponent>;
  let objectService: any = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrTextComponent ],
      providers: [
        { provide: DrawerObjectHelperService, useValue: objectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
