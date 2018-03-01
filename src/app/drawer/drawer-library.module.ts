import { NgModule, ModuleWithProviders, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRedux, NgReduxModule } from '@angular-redux/store';


import { DrawerModule } from './drawer/drawer.module';
import { SelectorToolModule } from './tools/selector-tool/selector-tool.module';
import { IDrawerAppState, rootReducer, INITIAL_STATE, undoableElementsReducer } from './store';
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
export { DataStoreService } from './services/data-store.service';

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