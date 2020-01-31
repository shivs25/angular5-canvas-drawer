"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var editable_drawer_component_1 = require("./editable-drawer.component");
var editor_module_1 = require("../tools/editor.module");
var EditableDrawerModule = /** @class */ (function () {
    function EditableDrawerModule() {
    }
    EditableDrawerModule_1 = EditableDrawerModule;
    EditableDrawerModule.forRoot = function () { return { ngModule: EditableDrawerModule_1, providers: [] }; };
    var EditableDrawerModule_1;
    EditableDrawerModule = EditableDrawerModule_1 = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, editor_module_1.EditorModule.forRoot()],
            declarations: [
                editable_drawer_component_1.EditableDrawerComponent
            ],
            exports: [editable_drawer_component_1.EditableDrawerComponent],
            providers: [],
            entryComponents: []
        })
    ], EditableDrawerModule);
    return EditableDrawerModule;
}());
exports.EditableDrawerModule = EditableDrawerModule;
//# sourceMappingURL=editable-drawer.module.js.map