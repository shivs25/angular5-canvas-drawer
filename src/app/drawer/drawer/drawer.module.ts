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
import { ChangeHelperService } from '../services/change-helper.service';
import { DrGroupedObjectComponent } from '../elements/dr-grouped-object/dr-grouped-object.component';

@NgModule({
  imports: [CommonModule],

  declarations: [
    DrawerComponent,
    DrRectComponent,
    DrObjectComponent,
    DrEllipseComponent,
    DrPolygonComponent,
    DrTextComponent,
    DrImageComponent,
    DrGroupedObjectComponent,
    DynamicSvgDirective
  ], 
  exports: [DrawerComponent, DynamicSvgDirective], 
  providers: [ChangeHelperService, DrawerObjectHelperService, DataStoreService, DynamicSvgDirective],
  entryComponents: [
    DrRectComponent,
    DrEllipseComponent,
    DrPolygonComponent,
    DrTextComponent,
    DrImageComponent,
    DrGroupedObjectComponent
  ]
})

export class DrawerModule {
  static forRoot(): ModuleWithProviders { return {ngModule: DrawerModule, providers: [ChangeHelperService, DrawerObjectHelperService, DataStoreService, DynamicSvgDirective]}; }
}