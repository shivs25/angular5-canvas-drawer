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
var editor_module_1 = require("../tools/editor.module");
var DrawerModule = (function () {
    function DrawerModule() {
    }
    DrawerModule.forRoot = function () { return { ngModule: DrawerModule, providers: [dynamic_svg_directive_1.DynamicSvgDirective, drawer_object_helper_service_1.DrawerObjectHelperService, data_store_service_1.DataStoreService] }; };
    DrawerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, editor_module_1.EditorModule.forRoot()],
                    declarations: [
                        drawer_component_1.DrawerComponent,
                        dr_rect_component_1.DrRectComponent,
                        dynamic_svg_directive_1.DynamicSvgDirective,
                        dr_object_component_1.DrObjectComponent,
                        dr_ellipse_component_1.DrEllipseComponent,
                        dr_polygon_component_1.DrPolygonComponent,
                        dr_text_component_1.DrTextComponent,
                        dr_image_component_1.DrImageComponent
                    ],
                    exports: [drawer_component_1.DrawerComponent],
                    providers: [dynamic_svg_directive_1.DynamicSvgDirective, data_store_service_1.DataStoreService],
                    entryComponents: [
                        dr_rect_component_1.DrRectComponent,
                        dr_ellipse_component_1.DrEllipseComponent,
                        dr_polygon_component_1.DrPolygonComponent,
                        dr_text_component_1.DrTextComponent,
                        dr_image_component_1.DrImageComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    DrawerModule.ctorParameters = function () { return []; };
    return DrawerModule;
}());
exports.DrawerModule = DrawerModule;
//# sourceMappingURL=drawer.module.js.map