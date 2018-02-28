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
/* export { DrPoint } from '../models/dr-point';
export { DrObject } from '../models/dr-object';
export { DrRect } from '../models/dr-rect';
export { DrEllipse } from '../models/dr-ellipse';
export { DrPolygon } from '../models/dr-polygon';
export { DrType } from '../models/dr-type.enum';
export { DrText } from '../models/dr-text';
export { DrImage } from '../models/dr-image';
export { DrTextAlignment } from '../models/dr-text-alignment.enum'; */
var DrawerModule = /** @class */ (function () {
    function DrawerModule() {
    }
    DrawerModule.forRoot = function () { return { ngModule: DrawerModule, providers: [dynamic_svg_directive_1.DynamicSvgDirective] }; };
    DrawerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [
                        drawer_component_1.DrawerComponent,
                        //EditorToolsComponent,
                        dr_rect_component_1.DrRectComponent,
                        dynamic_svg_directive_1.DynamicSvgDirective,
                        dr_object_component_1.DrObjectComponent,
                        dr_ellipse_component_1.DrEllipseComponent,
                        dr_polygon_component_1.DrPolygonComponent,
                        dr_text_component_1.DrTextComponent,
                        dr_image_component_1.DrImageComponent
                    ],
                    exports: [drawer_component_1.DrawerComponent],
                    providers: [dynamic_svg_directive_1.DynamicSvgDirective],
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