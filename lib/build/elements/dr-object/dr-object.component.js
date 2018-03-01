"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DrObjectComponent = (function () {
    function DrObjectComponent() {
        //@select()
        this.click = new core_1.EventEmitter();
    }
    DrObjectComponent.prototype.onClick = function (data) {
        if (data.clickable) {
            this.click.emit(data);
        }
    };
    DrObjectComponent.prototype.ngOnInit = function () {
    };
    DrObjectComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-dr-object',
                    template: "\n    <p>\n      dr-object works!\n    </p>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrObjectComponent.ctorParameters = function () { return []; };
    DrObjectComponent.propDecorators = {
        "elementTemplate": [{ type: core_1.ViewChild, args: ['elementTemplate',] },],
        "data": [{ type: core_1.Input },],
        "click": [{ type: core_1.Output },],
    };
    return DrObjectComponent;
}());
exports.DrObjectComponent = DrObjectComponent;
//# sourceMappingURL=dr-object.component.js.map