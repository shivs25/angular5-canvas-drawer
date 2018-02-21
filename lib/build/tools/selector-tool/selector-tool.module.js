"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var selector_tool_component_1 = require("./selector-tool.component");
var SelectorToolModule = (function () {
    function SelectorToolModule() {
    }
    SelectorToolModule.forRoot = function () { return { ngModule: SelectorToolModule, providers: [] }; };
    SelectorToolModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [selector_tool_component_1.SelectorToolComponent],
                    exports: [selector_tool_component_1.SelectorToolComponent]
                },] },
    ];
    /** @nocollapse */
    SelectorToolModule.ctorParameters = function () { return []; };
    return SelectorToolModule;
}());
exports.SelectorToolModule = SelectorToolModule;
//# sourceMappingURL=selector-tool.module.js.map