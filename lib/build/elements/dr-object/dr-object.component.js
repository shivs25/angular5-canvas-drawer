"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var drawer_object_helper_service_1 = require("../../services/drawer-object-helper.service");
var DrObjectComponent = (function () {
    function DrObjectComponent(_objectHelperService) {
        this._objectHelperService = _objectHelperService;
        this.overrideProperties = null;
        this.hoverClass = 'pointer';
        this.canInteract = true;
        this.click = new core_1.EventEmitter();
        this.mouseDown = new core_1.EventEmitter();
        this.mouseMove = new core_1.EventEmitter();
        this.mouseUp = new core_1.EventEmitter();
    }
    DrObjectComponent.prototype.getRotationCenterX = function () {
        var b = this._objectHelperService.getBoundingBox([this.data]);
        return b.x + b.width / 2;
    };
    DrObjectComponent.prototype.getRotationCenterY = function () {
        var b = this._objectHelperService.getBoundingBox([this.data]);
        return b.y + b.height / 2;
    };
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
    DrObjectComponent.ctorParameters = function () { return [
        { type: drawer_object_helper_service_1.DrawerObjectHelperService, },
    ]; };
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