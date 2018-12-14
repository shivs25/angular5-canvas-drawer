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
var editor_tool_component_1 = require("./editor-tool.component");
var selector_tool_component_1 = require("./selector-tool/selector-tool.component");
var drawer_module_1 = require("../drawer/drawer.module");
var drawer_component_1 = require("../drawer/drawer.component");
var object_creation_tool_component_1 = require("./object-creation-tool/object-creation-tool.component");
var pen_tool_component_1 = require("./pen-tool/pen-tool.component");
var text_edit_tool_component_1 = require("./text-edit-tool/text-edit-tool.component");
var editable_text_area_component_1 = require("./editable-text-area/editable-text-area.component");
var callout_point_tool_component_1 = require("./callout-point-tool/callout-point-tool.component");
var EditorModule = /** @class */ (function () {
    function EditorModule() {
    }
    EditorModule_1 = EditorModule;
    EditorModule.forRoot = function () { return { ngModule: EditorModule_1, providers: [] }; };
    var EditorModule_1;
    EditorModule = EditorModule_1 = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, drawer_module_1.DrawerModule.forRoot()],
            declarations: [editor_tool_component_1.EditorToolComponent, selector_tool_component_1.SelectorToolComponent, object_creation_tool_component_1.ObjectCreationToolComponent, pen_tool_component_1.PenToolComponent, text_edit_tool_component_1.TextEditToolComponent, editable_text_area_component_1.EditableTextAreaComponent, callout_point_tool_component_1.CalloutPointToolComponent],
            exports: [drawer_component_1.DrawerComponent, editor_tool_component_1.EditorToolComponent],
            providers: [],
            entryComponents: []
        })
    ], EditorModule);
    return EditorModule;
}());
exports.EditorModule = EditorModule;
//# sourceMappingURL=editor.module.js.map