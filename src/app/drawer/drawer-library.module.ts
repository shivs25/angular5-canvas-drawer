import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer/drawer.component';
//import { EditorToolsComponent } from './editor-tools/editor-tools.component';
import { DrRectComponent } from './elements/dr-rect/dr-rect.component';
import { DynamicSvgDirective } from './dynamic-svg/dynamic-svg.directive';
import { DrObjectComponent } from './elements/dr-object/dr-object.component';
import { DrEllipseComponent } from './elements/dr-ellipse/dr-ellipse.component';
import { DrPolygonComponent } from './elements/dr-polygon/dr-polygon.component';
import { SelectorToolComponent } from './tools/selector-tool/selector-tool.component';

import { Point } from './models/point';
import { DrObject } from './models/dr-object';
import { DrPolygon } from './models/dr-polygon';
import { DrEllipse } from './models/dr-ellipse';
import { DrRect } from './models/dr-rect';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DrawerComponent,
    //EditorToolsComponent,
    DrRectComponent,
    DynamicSvgDirective,
    DrObjectComponent,
    DrEllipseComponent,
    DrPolygonComponent,
    SelectorToolComponent
  ],
  exports: [
    DrawerComponent,
  ],
  entryComponents: [
    DrRectComponent,
    DrEllipseComponent,
    DrPolygonComponent
  ]
})
export class DrawerLibraryModule { }