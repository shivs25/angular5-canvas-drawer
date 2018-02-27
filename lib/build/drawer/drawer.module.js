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
var dr_point_1 = require("../models/dr-point");
exports.DrPoint = dr_point_1.DrPoint;
var dr_object_1 = require("../models/dr-object");
exports.DrObject = dr_object_1.DrObject;
var dr_rect_1 = require("../models/dr-rect");
exports.DrRect = dr_rect_1.DrRect;
var dr_ellipse_1 = require("../models/dr-ellipse");
exports.DrEllipse = dr_ellipse_1.DrEllipse;
var dr_polygon_1 = require("../models/dr-polygon");
exports.DrPolygon = dr_polygon_1.DrPolygon;
var dr_type_enum_1 = require("../models/dr-type.enum");
exports.DrType = dr_type_enum_1.DrType;
var dr_text_1 = require("../models/dr-text");
exports.DrText = dr_text_1.DrText;
var dr_image_1 = require("../models/dr-image");
exports.DrImage = dr_image_1.DrImage;
var dr_text_alignment_enum_1 = require("../models/dr-text-alignment.enum");
exports.DrTextAlignment = dr_text_alignment_enum_1.DrTextAlignment;
var DrawerModule = (function () {
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
                        dr_polygon_component_1.DrPolygonComponent
                    ],
                    exports: [drawer_component_1.DrawerComponent],
                    providers: [dynamic_svg_directive_1.DynamicSvgDirective],
                    entryComponents: [
                        dr_rect_component_1.DrRectComponent,
                        dr_ellipse_component_1.DrEllipseComponent,
                        dr_polygon_component_1.DrPolygonComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    DrawerModule.ctorParameters = function () { return []; };
    return DrawerModule;
}());
exports.DrawerModule = DrawerModule;
//# sourceMappingURL=drawer.module.js.map