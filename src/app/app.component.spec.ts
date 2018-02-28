import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { DrawerComponent } from './drawer/drawer/drawer.component';
import { DynamicSvgDirective } from './drawer/dynamic-svg/dynamic-svg.directive';
import { DrawerObjectHelperService } from './drawer/drawer-library.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DrawerComponent,
        DynamicSvgDirective
      ],
      providers: [DrawerObjectHelperService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
