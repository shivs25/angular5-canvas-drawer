import { CommonModule } from '@angular/common';import { NgModule, ModuleWithProviders } from '@angular/core';

import { DrawerComponent } from "./drawer.component";
import { DrRectComponent } from "../elements/dr-rect/dr-rect.component";
import { DrPolygonComponent } from "../elements/dr-polygon/dr-polygon.component";
import { DynamicSvgDirective } from "../dynamic-svg/dynamic-svg.directive";
import { DrObjectComponent } from "../elements/dr-object/dr-object.component";
import { DrEllipseComponent } from "../elements/dr-ellipse/dr-ellipse.component";
import { DrTextAlignment } from '../models/dr-text-alignment.enum';
import { DrTextComponent } from '../elements/dr-text/dr-text.component';
import { DrImageComponent } from '../elements/dr-image/dr-image.component';
import { DataStoreService } from '../services/data-store.service';
import { DrawerObjectHelperService } from '../services/drawer-object-helper.service';

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
  providers: [DynamicSvgDirective, DataStoreService],
  entryComponents: [
    DrRectComponent,
    DrEllipseComponent,
    DrPolygonComponent,
    DrTextComponent,
    DrImageComponent
  ]
})

export class DrawerModule {
  static forRoot(): ModuleWithProviders { return {ngModule: DrawerModule, providers: [DynamicSvgDirective, DrawerObjectHelperService, DataStoreService]}; }
}