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
var dr_object_1 = require("../models/dr-object");
var dr_rect_1 = require("../models/dr-rect");
var dr_ellipse_1 = require("../models/dr-ellipse");
var dr_polygon_1 = require("../models/dr-polygon");
var point_1 = require("../models/point");
exports.Point = point_1.Point;
var dr_object_2 = require("../models/dr-object");
exports.DrObject = dr_object_2.DrObject;
var dr_rect_2 = require("../models/dr-rect");
exports.DrRect = dr_rect_2.DrRect;
var dr_ellipse_2 = require("../models/dr-ellipse");
exports.DrEllipse = dr_ellipse_2.DrEllipse;
var dr_polygon_2 = require("../models/dr-polygon");
exports.DrPolygon = dr_polygon_2.DrPolygon;
var DrawerModule = /** @class */ (function () {
    function DrawerModule() {
    }
    DrawerModule.forRoot = function () { return { ngModule: DrawerModule, providers: [dynamic_svg_directive_1.DynamicSvgDirective, dr_object_1.DrObject, dr_ellipse_1.DrEllipse, dr_rect_1.DrRect, dr_polygon_1.DrPolygon] }; };
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