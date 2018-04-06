"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var store_1 = require("@angular-redux/store");
var drawer_module_1 = require("./drawer/drawer.module");
var store_2 = require("./store");
var editable_drawer_component_1 = require("./editable-drawer/editable-drawer.component");
var editable_drawer_module_1 = require("./editable-drawer/editable-drawer.module");
var drawer_component_1 = require("./drawer/drawer.component");
var preview_component_1 = require("./preview/preview.component");
var dr_polygon_1 = require("./models/dr-polygon");
exports.createDrPolygon = dr_polygon_1.createDrPolygon;
exports.createDrPolyline = dr_polygon_1.createDrPolyline;
exports.createDrPolygonArrow = dr_polygon_1.createDrPolygonArrow;
exports.createDrPolygonCallout = dr_polygon_1.createDrPolygonCallout;
exports.createDrPolygonStar = dr_polygon_1.createDrPolygonStar;
exports.createDrPolygonTriangle = dr_polygon_1.createDrPolygonTriangle;
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
var data_store_service_1 = require("./services/data-store.service");
exports.DataStoreService = data_store_service_1.DataStoreService;
var change_helper_service_1 = require("./services/change-helper.service");
exports.ChangeHelperService = change_helper_service_1.ChangeHelperService;
var enums_1 = require("./models/enums");
exports.EditorToolType = enums_1.EditorToolType;
var dr_style_1 = require("./models/dr-style");
exports.createDrStyle = dr_style_1.createDrStyle;
var dr_text_style_1 = require("./models/dr-text-style");
exports.createDrTextStyle = dr_text_style_1.createDrTextStyle;
var dr_grouped_object_1 = require("./models/dr-grouped-object");
exports.createDrGroupedObject = dr_grouped_object_1.createDrGroupedObject;
var dr_callout_1 = require("./models/dr-callout");
exports.createDrCallout = dr_callout_1.createDrCallout;
var DrawerLibraryRootModule = /** @class */ (function () {
    function DrawerLibraryRootModule(ngRedux) {
        ngRedux.configureStore(store_2.rootReducer, store_2.INITIAL_STATE);
    }
    DrawerLibraryRootModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        editable_drawer_module_1.EditableDrawerModule.forRoot(),
                        drawer_module_1.DrawerModule.forRoot(),
                    ],
                    exports: [
                        store_1.NgReduxModule,
                        editable_drawer_component_1.EditableDrawerComponent,
                        drawer_component_1.DrawerComponent,
                        preview_component_1.PreviewComponent
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
        { type: core_1.NgModule, args: [{ imports: [drawer_module_1.DrawerModule.forRoot(), common_1.CommonModule], exports: [common_1.CommonModule, store_1.NgReduxModule] },] },
    ];
    /** @nocollapse */
    DrawerLibraryModule.ctorParameters = function () { return []; };
    return DrawerLibraryModule;
}());
exports.DrawerLibraryModule = DrawerLibraryModule;
//# sourceMappingURL=drawer-library.module.js.map