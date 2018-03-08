"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var editor_tool_component_1 = require("./editor-tool.component");
var selector_tool_component_1 = require("./selector-tool/selector-tool.component");
var drawer_module_1 = require("../drawer/drawer.module");
var drawer_component_1 = require("../drawer/drawer.component");
var object_creation_tool_component_1 = require("./object-creation-tool/object-creation-tool.component");
var pen_tool_component_1 = require("./pen-tool/pen-tool.component");
var EditorModule = /** @class */ (function () {
    function EditorModule() {
    }
    EditorModule.forRoot = function () { return { ngModule: EditorModule, providers: [] }; };
    EditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, drawer_module_1.DrawerModule.forRoot()],
                    declarations: [editor_tool_component_1.EditorToolComponent, selector_tool_component_1.SelectorToolComponent, object_creation_tool_component_1.ObjectCreationToolComponent, pen_tool_component_1.PenToolComponent],
                    exports: [drawer_component_1.DrawerComponent, editor_tool_component_1.EditorToolComponent],
                    providers: [],
                    entryComponents: []
                },] },
    ];
    /** @nocollapse */
    EditorModule.ctorParameters = function () { return []; };
    return EditorModule;
}());
exports.EditorModule = EditorModule;
//# sourceMappingURL=editor.module.js.map