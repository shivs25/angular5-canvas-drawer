"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DrObjectComponent = (function () {
    function DrObjectComponent() {
        this.overrideProperties = null;
        this.hoverClass = 'pointer';
        this.canInteract = true;
        this.click = new core_1.EventEmitter();
        this.mouseDown = new core_1.EventEmitter();
        this.mouseMove = new core_1.EventEmitter();
        this.mouseUp = new core_1.EventEmitter();
    }
    DrObjectComponent.prototype.onClick = function (evt, data) {
        evt.stopPropagation();
        this.click.emit(data);
    };
    DrObjectComponent.prototype.onMouseDown = function (evt, data) {
        evt.stopPropagation();
        this.mouseDown.emit({
            location: {
                x: evt.clientX, y: evt.clientY
            },
            data: data,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    DrObjectComponent.prototype.onMouseMove = function (evt, data) {
        evt.stopPropagation();
        this.mouseMove.emit({
            location: {
                x: evt.clientX, y: evt.clientY
            },
            data: data,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    DrObjectComponent.prototype.onMouseUp = function (evt, data) {
        evt.stopPropagation();
        this.mouseUp.emit({
            location: {
                x: evt.clientX, y: evt.clientY
            },
            data: data,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
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
        "overrideProperties": [{ type: core_1.Input },],
        "hoverClass": [{ type: core_1.Input },],
        "canInteract": [{ type: core_1.Input },],
        "elementId": [{ type: core_1.Input },],
        "click": [{ type: core_1.Output },],
        "mouseDown": [{ type: core_1.Output },],
        "mouseMove": [{ type: core_1.Output },],
        "mouseUp": [{ type: core_1.Output },],
    };
    return DrObjectComponent;
}());
exports.DrObjectComponent = DrObjectComponent;
//# sourceMappingURL=dr-object.component.js.map