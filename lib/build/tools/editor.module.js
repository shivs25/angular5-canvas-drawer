"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var editor_tool_component_1 = require("./editor-tool.component");
var EditorModule = (function () {
    function EditorModule() {
    }
    EditorModule.forRoot = function () { return { ngModule: EditorModule, providers: [] }; };
    EditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [editor_tool_component_1.EditorToolComponent],
                    exports: [editor_tool_component_1.EditorToolComponent],
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