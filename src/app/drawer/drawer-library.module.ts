import { NgModule, ModuleWithProviders, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRedux, NgReduxModule } from '@angular-redux/store';


import { DrawerModule } from './drawer/drawer.module';
import { IDrawerAppState, rootReducer, INITIAL_STATE, undoableElementsReducer } from './store';
import { EditorModule } from './tools/editor.module';
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
export { EditorToolType } from './models/enums';

@NgModule({
  imports: [
    CommonModule,
    DrawerModule.forRoot(),
    EditorModule.forRoot()
  ],
  exports: [
    NgReduxModule,
    DrawerModule
  ],
  declarations: [],
})
export class DrawerLibraryRootModule {
  constructor(ngRedux: NgRedux<IDrawerAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
    
  }
 }

@NgModule({imports: [DrawerModule.forRoot(), CommonModule], exports: [CommonModule, DrawerModule]})
export class DrawerLibraryModule {
  static forRoot(): ModuleWithProviders { return {ngModule: DrawerLibraryRootModule}; }
}