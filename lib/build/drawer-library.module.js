"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var dr_point_circle_1 = require("./models/dr-point-circle");
exports.createDrPointCircle = dr_point_circle_1.createDrPointCircle;
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
var store_3 = require("./store");
exports.INITIAL_STATE = store_3.INITIAL_STATE;
var custom_component_resolver_service_1 = require("./services/custom-component-resolver.service");
exports.CustomComponentResolverService = custom_component_resolver_service_1.CustomComponentResolverService;
var dr_object_component_1 = require("./elements/dr-object/dr-object.component");
exports.DrObjectComponent = dr_object_component_1.DrObjectComponent;
var DrawerLibraryRootModule = /** @class */ (function () {
    function DrawerLibraryRootModule(ngRedux) {
        ngRedux.configureStore(store_2.rootReducer, store_2.INITIAL_STATE);
    }
    DrawerLibraryRootModule = __decorate([
        core_1.NgModule({
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
        }),
        __metadata("design:paramtypes", [store_1.NgRedux])
    ], DrawerLibraryRootModule);
    return DrawerLibraryRootModule;
}());
exports.DrawerLibraryRootModule = DrawerLibraryRootModule;
var DrawerLibraryModule = /** @class */ (function () {
    function DrawerLibraryModule() {
    }
    DrawerLibraryModule.forRoot = function () { return { ngModule: DrawerLibraryRootModule }; };
    DrawerLibraryModule = __decorate([
        core_1.NgModule({ imports: [drawer_module_1.DrawerModule.forRoot(), common_1.CommonModule], exports: [common_1.CommonModule, store_1.NgReduxModule] })
    ], DrawerLibraryModule);
    return DrawerLibraryModule;
}());
exports.DrawerLibraryModule = DrawerLibraryModule;
//# sourceMappingURL=drawer-library.module.js.map