"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var drawer_module_1 = require("./drawer/drawer.module");
var selector_tool_module_1 = require("./tools/selector-tool/selector-tool.module");
var point_1 = require("./models/point");
exports.Point = point_1.Point;
var dr_object_1 = require("./models/dr-object");
exports.DrObject = dr_object_1.DrObject;
var dr_polygon_1 = require("./models/dr-polygon");
exports.DrPolygon = dr_polygon_1.DrPolygon;
var dr_ellipse_1 = require("./models/dr-ellipse");
exports.DrEllipse = dr_ellipse_1.DrEllipse;
var dr_rect_1 = require("./models/dr-rect");
exports.DrRect = dr_rect_1.DrRect;
var DrawerLibraryRootModule = /** @class */ (function () {
    function DrawerLibraryRootModule() {
    }
    DrawerLibraryRootModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        selector_tool_module_1.SelectorToolModule.forRoot(),
                        drawer_module_1.DrawerModule.forRoot()
                    ],
                    exports: [
                        selector_tool_module_1.SelectorToolModule,
                        drawer_module_1.DrawerModule
                    ],
                },] },
    ];
    /** @nocollapse */
    DrawerLibraryRootModule.ctorParameters = function () { return []; };
    return DrawerLibraryRootModule;
}());
exports.DrawerLibraryRootModule = DrawerLibraryRootModule;
var DrawerLibraryModule = /** @class */ (function () {
    function DrawerLibraryModule() {
    }
    DrawerLibraryModule.forRoot = function () { return { ngModule: DrawerLibraryRootModule }; };
    DrawerLibraryModule.decorators = [
        { type: core_1.NgModule, args: [{ imports: [selector_tool_module_1.SelectorToolModule.forRoot(), drawer_module_1.DrawerModule.forRoot(), common_1.CommonModule], exports: [common_1.CommonModule, selector_tool_module_1.SelectorToolModule, drawer_module_1.DrawerModule] },] },
    ];
    /** @nocollapse */
    DrawerLibraryModule.ctorParameters = function () { return []; };
    return DrawerLibraryModule;
}());
exports.DrawerLibraryModule = DrawerLibraryModule;
//# sourceMappingURL=drawer-library.module.js.map