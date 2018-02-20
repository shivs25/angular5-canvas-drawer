"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var drawer_component_1 = require("./drawer/drawer.component");
var dr_rect_component_1 = require("./elements/dr-rect/dr-rect.component");
var dynamic_svg_directive_1 = require("./dynamic-svg/dynamic-svg.directive");
var dr_object_component_1 = require("./elements/dr-object/dr-object.component");
var dr_ellipse_component_1 = require("./elements/dr-ellipse/dr-ellipse.component");
var dr_polygon_component_1 = require("./elements/dr-polygon/dr-polygon.component");
var selector_tool_component_1 = require("./tools/selector-tool/selector-tool.component");
var DrawerLibraryModule = /** @class */ (function () {
    function DrawerLibraryModule() {
    }
    DrawerLibraryModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        drawer_component_1.DrawerComponent,
                        //EditorToolsComponent,
                        dr_rect_component_1.DrRectComponent,
                        dynamic_svg_directive_1.DynamicSvgDirective,
                        dr_object_component_1.DrObjectComponent,
                        dr_ellipse_component_1.DrEllipseComponent,
                        dr_polygon_component_1.DrPolygonComponent,
                        selector_tool_component_1.SelectorToolComponent,
                    ],
                    exports: [
                        drawer_component_1.DrawerComponent,
                        dynamic_svg_directive_1.DynamicSvgDirective
                    ],
                    entryComponents: [
                        dr_rect_component_1.DrRectComponent,
                        dr_ellipse_component_1.DrEllipseComponent,
                        dr_polygon_component_1.DrPolygonComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    DrawerLibraryModule.ctorParameters = function () { return []; };
    return DrawerLibraryModule;
}());
exports.DrawerLibraryModule = DrawerLibraryModule;
//# sourceMappingURL=drawer-library.module.js.map