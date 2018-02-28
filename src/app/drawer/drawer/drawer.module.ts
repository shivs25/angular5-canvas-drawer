import { CommonModule } from '@angular/common';import { NgModule, ModuleWithProviders } from '@angular/core';

import { DrawerComponent } from "./drawer.component";
import { DrRectComponent } from "../elements/dr-rect/dr-rect.component";
import { DrPolygonComponent } from "../elements/dr-polygon/dr-polygon.component";
import { DynamicSvgDirective } from "../dynamic-svg/dynamic-svg.directive";
import { DrObjectComponent } from "../elements/dr-object/dr-object.component";
import { DrEllipseComponent } from "../elements/dr-ellipse/dr-ellipse.component";
import { DrPoint } from '../models/dr-point';
import { DrObject } from '../models/dr-object';
import { DrRect } from '../models/dr-rect';
import { DrEllipse } from '../models/dr-ellipse';
import { DrPolygon } from '../models/dr-polygon';
import { DrType } from '../models/dr-type.enum';
import { DrText } from '../models/dr-text';
import { DrImage } from '../models/dr-image';
import { DrTextAlignment } from '../models/dr-text-alignment.enum';
import { DrTextComponent } from '../elements/dr-text/dr-text.component';
import { DrImageComponent } from '../elements/dr-image/dr-image.component';

export { DrPoint } from '../models/dr-point';
export { DrObject } from '../models/dr-object';
export { DrRect } from '../models/dr-rect';
export { DrEllipse } from '../models/dr-ellipse';
export { DrPolygon } from '../models/dr-polygon';
export { DrType } from '../models/dr-type.enum';
export { DrText } from '../models/dr-text';
export { DrImage } from '../models/dr-image';
export { DrTextAlignment } from '../models/dr-text-alignment.enum';

@NgModule({
  imports: [CommonModule],

  declarations: [
    DrawerComponent,
    //EditorToolsComponent,
    DrRectComponent,
    DynamicSvgDirective,
    DrObjectComponent,
    DrEllipseComponent,
    DrPolygonComponent,
    DrTextComponent,
    DrImageComponent
  ], 
  exports: [DrawerComponent], 
  providers: [DynamicSvgDirective],
  entryComponents: [
    DrRectComponent,
    DrEllipseComponent,
    DrPolygonComponent,
    DrTextComponent,
    DrImageComponent
  ]
})

export class DrawerModule {
  static forRoot(): ModuleWithProviders { return {ngModule: DrawerModule, providers: [DynamicSvgDirective]}; }
}