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
import { PreviewComponent } from '../preview/preview.component';
import { TextRenderingService } from '../services/text-rendering.service';
import { DrCalloutComponent } from '../elements/dr-callout/dr-callout.component';
import { CustomComponentResolverService } from '../services/custom-component-resolver.service';
import { DrPointComponent } from '../elements/dr-point/dr-point.component';

@NgModule({
  imports: [CommonModule],

  declarations: [
    DrawerComponent,
    DrRectComponent,
    DrObjectComponent,
    DrEllipseComponent,
    DrPointComponent,
    DrPolygonComponent,
    DrTextComponent,
    DrImageComponent,
    DrGroupedObjectComponent,
    DrCalloutComponent,
    DynamicSvgDirective,
    PreviewComponent
  ], 
  exports: [DrawerComponent, PreviewComponent, DynamicSvgDirective], 
  providers: [ChangeHelperService, DrawerObjectHelperService, DataStoreService, DynamicSvgDirective, TextRenderingService, CustomComponentResolverService],
  entryComponents: [
    DrRectComponent,
    DrEllipseComponent,
    DrPointComponent,
    DrPolygonComponent,
    DrTextComponent,
    DrImageComponent,
    DrCalloutComponent,
    DrGroupedObjectComponent
  ]
})

export class DrawerModule {
  static forRoot(): ModuleWithProviders { return {ngModule: DrawerModule, providers: [ChangeHelperService, DrawerObjectHelperService, DataStoreService, DynamicSvgDirective, TextRenderingService, CustomComponentResolverService]}; }
}