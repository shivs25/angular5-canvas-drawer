"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TextEditToolComponent = (function () {
    function TextEditToolComponent() {
    }
    TextEditToolComponent.prototype.ngOnInit = function () {
    };
    TextEditToolComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-text-edit-tool',
                    template: "\n    <div class=\"absolute-position fill-parent\">\n    \n      <svg\n            [ngClass]=\"'text'\"\n            class=\"absolute-position fill-parent\" xmlns=\"http://www.w3.org/2000/svg\">\n          <ng-container *ngIf=\"currentObject\" dynamic-svg [componentData]=\"currentObject\" [canInteract]=\"false\" elementId=\"1000000\">\n          </ng-container>\n      </svg>\n    </div>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    TextEditToolComponent.ctorParameters = function () { return []; };
    return TextEditToolComponent;
}());
exports.TextEditToolComponent = TextEditToolComponent;
//# sourceMappingURL=text-edit-tool.component.js.map