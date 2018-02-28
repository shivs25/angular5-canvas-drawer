"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var store_1 = require("@angular-redux/store");
var drawer_module_1 = require("./drawer/drawer.module");
var selector_tool_module_1 = require("./tools/selector-tool/selector-tool.module");
var store_2 = require("./store");
var dr_polygon_1 = require("./models/dr-polygon");
exports.createDrPolygon = dr_polygon_1.createDrPolygon;
var dr_ellipse_1 = require("./models/dr-ellipse");
exports.createDrEllipse = dr_ellipse_1.createDrEllipse;
var dr_rect_1 = require("./models/dr-rect");
exports.createDrRect = dr_rect_1.createDrRect;
var dr_type_enum_1 = require("./models/dr-type.enum");
exports.DrType = dr_type_enum_1.DrType;
var dr_text_1 = require("./models/dr-text");
exports.createDrText = dr_text_1.createDrText;
var dr_image_1 = require("./models/dr-image");
exports.createDrImage = dr_image_1.createDrImage;
var dr_text_alignment_enum_1 = require("./models/dr-text-alignment.enum");
exports.DrTextAlignment = dr_text_alignment_enum_1.DrTextAlignment;
var drawer_object_helper_service_1 = require("./services/drawer-object-helper.service");
exports.DrawerObjectHelperService = drawer_object_helper_service_1.DrawerObjectHelperService;
var DrawerLibraryRootModule = /** @class */ (function () {
    function DrawerLibraryRootModule(ngRedux) {
        ngRedux.configureStore(store_2.rootReducer, store_2.INITIAL_STATE);
    }
    DrawerLibraryRootModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        selector_tool_module_1.SelectorToolModule.forRoot(),
                        drawer_module_1.DrawerModule.forRoot()
                    ],
                    exports: [
                        store_1.NgReduxModule,
                        selector_tool_module_1.SelectorToolModule,
                        drawer_module_1.DrawerModule
                    ],
                    declarations: [],
                },] },
    ];
    /** @nocollapse */
    DrawerLibraryRootModule.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
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