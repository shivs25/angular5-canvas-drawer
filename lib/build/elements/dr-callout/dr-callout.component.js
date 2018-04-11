"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dr_object_component_1 = require("../dr-object/dr-object.component");
var RADIUS = 16;
var DrCalloutComponent = /** @class */ (function (_super) {
    __extends(DrCalloutComponent, _super);
    function DrCalloutComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrCalloutComponent.prototype.getPath = function () {
        var r = this.data;
        var v = this.visualData;
        var b = [
            { x: r.x, y: r.y },
            { x: r.x, y: r.y + r.height },
            { x: r.x + r.width, y: r.y + r.height },
            { x: r.x + r.width, y: r.y }
        ];
        var points;
        if (v.drawPointer || !v.pointerLocked) {
            try {
                points = this._objectHelperService.getUnionOfShapes(b, [
                    r.basePoint1,
                    r.basePoint2,
                    r.pointerLocation
                ]);
            }
            catch (e) {
                points = [b[2], b[1], b[0], b[3]];
            }
        }
        else {
            points = [b[2], b[1], b[0], b[3]]; //Points have to be in this order for the for loop below to work.
        }
        var returnValue = "";
        if (null !== points) {
            if (r.rounded && r.width > 32 && r.height > 32) {
                var p = void 0;
                var c = void 0;
                var d = [];
                for (var i = 0; i < points.length; i++) {
                    p = points[i];
                    c = this.getCorner(b, p);
                    switch (c) {
                        case 0:
                            if (i === 0) {
                                d.push("M");
                            }
                            else {
                                d.push("L");
                            }
                            d.push.apply(d, [
                                p.x.toString(),
                                (p.y + 16).toString(),
                                "A", RADIUS.toString(), RADIUS.toString(), "0", "0", "1", (p.x + RADIUS).toString(), p.y.toString()
                            ]);
                            break;
                        case 1:
                            if (i === 0) {
                                d.push("M");
                            }
                            else {
                                d.push("L");
                            }
                            d.push.apply(d, [
                                (p.x + RADIUS).toString(),
                                p.y.toString(),
                                "A", RADIUS.toString(), RADIUS.toString(), "0", "0", "1", p.x.toString(), (p.y - RADIUS).toString()
                            ]);
                            break;
                        case 2:
                            if (i === 0) {
                                d.push("M");
                            }
                            else {
                                d.push("L");
                            }
                            d.push.apply(d, [
                                p.x.toString(),
                                (p.y - RADIUS).toString(),
                                "A", RADIUS.toString(), RADIUS.toString(), "0", "0", "1", (p.x - RADIUS).toString(), p.y.toString()
                            ]);
                            break;
                        case 3:
                            if (i === 0) {
                                d.push("M");
                            }
                            else {
                                d.push("L");
                            }
                            d.push.apply(d, [
                                (p.x - RADIUS).toString(),
                                p.y.toString(),
                                "A", RADIUS.toString(), RADIUS.toString(), "0", "0", "1", p.x.toString(), (p.y + RADIUS).toString()
                            ]);
                            break;
                        default:
                            if (i === 0) {
                                d.push("M");
                            }
                            else {
                                d.push("L");
                            }
                            d.push.apply(d, [
                                p.x.toString(),
                                p.y.toString()
                            ]);
                            break;
                    }
                }
                d.push("Z");
                returnValue = d.join(" ");
            }
            else {
                for (var i = 0; i < points.length; i++) {
                    if (0 === i) {
                        returnValue += "M" + points[i].x + "," + points[i].y + " ";
                    }
                    else {
                        returnValue += "L" + points[i].x + "," + points[i].y + " ";
                    }
                }
                returnValue += "Z";
            }
        }
        return returnValue;
    };
    DrCalloutComponent.prototype.getCorner = function (b, p) {
        return b.findIndex(function (d) { return Math.abs(d.x - p.x) < 1 && Math.abs(d.y - p.y) < 1; });
    };
    DrCalloutComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-dr-callout',
                    template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data && visualData\">\n        <svg:path\n          [id]=\"elementId\"\n          [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n          (click)=\"onClick($event, data)\"\n          (mousedown)=\"onMouseDown($event, data)\"\n          (mousemove)=\"onMouseMove($event, data)\"\n          (mouseup)=\"onMouseUp($event, data)\"\n          [attr.opacity]=\"visualData.opacity\"\n          [attr.d]=\"getPath()\"\n          [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n          [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n          [attr.stroke-width]=\"visualData.strokeWidth\"\n          [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n          >      \n        </svg:path>\n      </ng-container>\n    </ng-template>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrCalloutComponent.ctorParameters = function () { return []; };
    return DrCalloutComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrCalloutComponent = DrCalloutComponent;
//# sourceMappingURL=dr-callout.component.js.map