import { NgModule, ModuleWithProviders, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRedux, NgReduxModule } from '@angular-redux/store';


/* import { DrPoint } from './models/dr-point';
import { DrObject } from './models/dr-object';
import { DrPolygon } from './models/dr-polygon';
import { DrEllipse } from './models/dr-ellipse';
import { DrRect } from './models/dr-rect';
import { DrType } from './models/dr-type.enum';
import { DrText } from './models/dr-text';
import { DrImage } from './models/dr-image';
import { DrTextAlignment } from './models/dr-text-alignment.enum'; */

import { DrawerModule } from './drawer/drawer.module';
import { SelectorToolModule } from './tools/selector-tool/selector-tool.module';
import { IDrawerAppState, rootReducer, INITIAL_STATE } from './store';
//export { DrawerComponent } from './drawer/drawer.component';
//export { ComponentFactoryResolver } from '@angular/core';
export { DrPoint } from './models/dr-point';
export { DrObject } from './models/dr-object';
export { DrPolygon, createDrPolygon } from './models/dr-polygon';
export { DrEllipse, createDrEllipse } from './models/dr-ellipse';
export { DrRect, createDrRect } from './models/dr-rect';
export { DrType } from './models/dr-type.enum';
export { DrText, createDrText } from './models/dr-text';
export { DrImage, createDrImage } from './models/dr-image';
export { DrTextAlignment } from './models/dr-text-alignment.enum';
export { DrawerObjectHelperService } from './services/drawer-object-helper.service';

@NgModule({
  imports: [
    CommonModule,
    SelectorToolModule.forRoot(),
    DrawerModule.forRoot()
  ],
  exports: [
    NgReduxModule,
    SelectorToolModule,
    DrawerModule
  ],
  declarations: [],
})
export class DrawerLibraryRootModule {
  constructor(ngRedux: NgRedux<IDrawerAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
 }

@NgModule({imports: [SelectorToolModule.forRoot(), DrawerModule.forRoot(), CommonModule], exports: [CommonModule, SelectorToolModule, DrawerModule]})
export class DrawerLibraryModule {
  static forRoot(): ModuleWithProviders { return {ngModule: DrawerLibraryRootModule}; }
}