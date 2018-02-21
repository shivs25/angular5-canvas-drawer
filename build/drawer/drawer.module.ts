import { CommonModule } from '@angular/common';import { NgModule, ModuleWithProviders } from '@angular/core';

import { DrawerComponent } from "./drawer.component";
import { DrRectComponent } from "../elements/dr-rect/dr-rect.component";
import { DrPolygonComponent } from "../elements/dr-polygon/dr-polygon.component";
import { DynamicSvgDirective } from "../dynamic-svg/dynamic-svg.directive";
import { DrObjectComponent } from "../elements/dr-object/dr-object.component";
import { DrEllipseComponent } from "../elements/dr-ellipse/dr-ellipse.component";
import { Point } from '../models/point';
import { DrObject } from '../models/dr-object';
import { DrRect } from '../models/dr-rect';
import { DrEllipse } from '../models/dr-ellipse';
import { DrPolygon } from '../models/dr-polygon';


export { Point } from '../models/point';
export { DrObject } from '../models/dr-object';
export { DrRect } from '../models/dr-rect';
export { DrEllipse } from '../models/dr-ellipse';
export { DrPolygon } from '../models/dr-polygon';


@NgModule({
  imports: [CommonModule],

  declarations: [
    DrawerComponent,
    //EditorToolsComponent,
    DrRectComponent,
    DynamicSvgDirective,
    DrObjectComponent,
    DrEllipseComponent,
    DrPolygonComponent
  ], 
  exports: [DrawerComponent], 
  providers: [DynamicSvgDirective],
  entryComponents: [
    DrRectComponent,
    DrEllipseComponent,
    DrPolygonComponent
  ]
})

export class DrawerModule {
  static forRoot(): ModuleWithProviders { return {ngModule: DrawerModule, providers: [DynamicSvgDirective, DrObject, DrEllipse, DrRect, DrPolygon ]}; }
}