import { ModuleWithProviders } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDrawerAppState } from './store';
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
export declare class DrawerLibraryRootModule {
    constructor(ngRedux: NgRedux<IDrawerAppState>);
}
export declare class DrawerLibraryModule {
    static forRoot(): ModuleWithProviders;
}
