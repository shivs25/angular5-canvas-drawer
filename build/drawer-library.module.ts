import { NgModule, ModuleWithProviders, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DrawerComponent } from './drawer/drawer.component';
//import { EditorToolsComponent } from './editor-tools/editor-tools.component';
//import { DrRectComponent } from './elements/dr-rect/dr-rect.component';
//import { DynamicSvgDirective } from './dynamic-svg/dynamic-svg.directive';
//import { DrObjectComponent } from './elements/dr-object/dr-object.component';
//import { DrEllipseComponent } from './elements/dr-ellipse/dr-ellipse.component';
//import { DrPolygonComponent } from './elements/dr-polygon/dr-polygon.component';
//import { SelectorToolComponent } from './tools/selector-tool/selector-tool.component';


import { Point } from './models/point';
import { DrObject } from './models/dr-object';
import { DrPolygon } from './models/dr-polygon';
import { DrEllipse } from './models/dr-ellipse';
import { DrRect } from './models/dr-rect';


import { DrawerModule } from './drawer/drawer.module';
import { SelectorToolModule } from './tools/selector-tool/selector-tool.module';
//export { DrawerComponent } from './drawer/drawer.component';
//export { ComponentFactoryResolver } from '@angular/core';
export { Point } from './models/point';
export { DrObject } from './models/dr-object';
export { DrPolygon } from './models/dr-polygon';
export { DrEllipse } from './models/dr-ellipse';
export { DrRect } from './models/dr-rect';

@NgModule({
  imports: [
    CommonModule,
    SelectorToolModule.forRoot(),
    DrawerModule.forRoot()
  ],
  exports: [
    SelectorToolModule,
    DrawerModule
  ],
})
export class DrawerLibraryRootModule { }

@NgModule({imports: [SelectorToolModule.forRoot(), DrawerModule.forRoot(), CommonModule], exports: [CommonModule, SelectorToolModule, DrawerModule]})
export class DrawerLibraryModule {
  static forRoot(): ModuleWithProviders { return {ngModule: DrawerLibraryRootModule}; }
}