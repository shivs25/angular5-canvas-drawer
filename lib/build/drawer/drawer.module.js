"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var drawer_component_1 = require("./drawer.component");
var dr_rect_component_1 = require("../elements/dr-rect/dr-rect.component");
var dr_polygon_component_1 = require("../elements/dr-polygon/dr-polygon.component");
var dynamic_svg_directive_1 = require("../dynamic-svg/dynamic-svg.directive");
var dr_object_component_1 = require("../elements/dr-object/dr-object.component");
var dr_ellipse_component_1 = require("../elements/dr-ellipse/dr-ellipse.component");
var dr_text_component_1 = require("../elements/dr-text/dr-text.component");
var dr_image_component_1 = require("../elements/dr-image/dr-image.component");
var data_store_service_1 = require("../services/data-store.service");
var drawer_object_helper_service_1 = require("../services/drawer-object-helper.service");
var change_helper_service_1 = require("../services/change-helper.service");
var dr_grouped_object_component_1 = require("../elements/dr-grouped-object/dr-grouped-object.component");
var preview_component_1 = require("../preview/preview.component");
var text_rendering_service_1 = require("../services/text-rendering.service");
var dr_callout_component_1 = require("../elements/dr-callout/dr-callout.component");
var DrawerModule = /** @class */ (function () {
    function DrawerModule() {
    }
    DrawerModule.forRoot = function () { return { ngModule: DrawerModule, providers: [change_helper_service_1.ChangeHelperService, drawer_object_helper_service_1.DrawerObjectHelperService, data_store_service_1.DataStoreService, dynamic_svg_directive_1.DynamicSvgDirective, text_rendering_service_1.TextRenderingService] }; };
    DrawerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [
                        drawer_component_1.DrawerComponent,
                        dr_rect_component_1.DrRectComponent,
                        dr_object_component_1.DrObjectComponent,
                        dr_ellipse_component_1.DrEllipseComponent,
                        dr_polygon_component_1.DrPolygonComponent,
                        dr_text_component_1.DrTextComponent,
                        dr_image_component_1.DrImageComponent,
                        dr_grouped_object_component_1.DrGroupedObjectComponent,
                        dr_callout_component_1.DrCalloutComponent,
                        dynamic_svg_directive_1.DynamicSvgDirective,
                        preview_component_1.PreviewComponent
                    ],
                    exports: [drawer_component_1.DrawerComponent, preview_component_1.PreviewComponent, dynamic_svg_directive_1.DynamicSvgDirective],
                    providers: [change_helper_service_1.ChangeHelperService, drawer_object_helper_service_1.DrawerObjectHelperService, data_store_service_1.DataStoreService, dynamic_svg_directive_1.DynamicSvgDirective, text_rendering_service_1.TextRenderingService],
                    entryComponents: [
                        dr_rect_component_1.DrRectComponent,
                        dr_ellipse_component_1.DrEllipseComponent,
                        dr_polygon_component_1.DrPolygonComponent,
                        dr_text_component_1.DrTextComponent,
                        dr_image_component_1.DrImageComponent,
                        dr_callout_component_1.DrCalloutComponent,
                        dr_grouped_object_component_1.DrGroupedObjectComponent
                    ]
                },] },
    ];
    return DrawerModule;
}());
exports.DrawerModule = DrawerModule;
//# sourceMappingURL=drawer.module.js.map