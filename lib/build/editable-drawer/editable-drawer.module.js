"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var editable_drawer_component_1 = require("./editable-drawer.component");
var editor_module_1 = require("../tools/editor.module");
var EditableDrawerModule = (function () {
    function EditableDrawerModule() {
    }
    EditableDrawerModule.forRoot = function () { return { ngModule: EditableDrawerModule, providers: [] }; };
    EditableDrawerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, editor_module_1.EditorModule.forRoot()],
                    declarations: [
                        editable_drawer_component_1.EditableDrawerComponent
                    ],
                    exports: [editable_drawer_component_1.EditableDrawerComponent],
                    providers: [],
                    entryComponents: []
                },] },
    ];
    /** @nocollapse */
    EditableDrawerModule.ctorParameters = function () { return []; };
    return EditableDrawerModule;
}());
exports.EditableDrawerModule = EditableDrawerModule;
//# sourceMappingURL=editable-drawer.module.js.map