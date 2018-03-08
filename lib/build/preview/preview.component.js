"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var PreviewComponent = /** @class */ (function () {
    function PreviewComponent() {
        this.hoverClass = '';
        this.overrideProperties = null;
    }
    PreviewComponent.prototype.ngOnInit = function () {
    };
    PreviewComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-preview',
                    template: "\n\n    <div class=\"absolute-position fill-parent\">\n    \n      <svg \n            class=\"absolute-position fill-parent\" xmlns=\"http://www.w3.org/2000/svg\">\n        <ng-container *ngFor=\"let s of (editingState | async)?.previewElements; let i = index\">\n          <ng-container *ngIf=\"s.visible\" dynamic-svg [componentData]=\"s\" [overrideProperties]=\"overrideProperties\" [elementId]=\"i + 1\"\n            [hoverClass]=\"hoverClass\"\n            >\n          </ng-container>\n        </ng-container>\n      </svg>\n    </div>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    PreviewComponent.ctorParameters = function () { return []; };
    PreviewComponent.propDecorators = {
        "hoverClass": [{ type: core_1.Input },],
        "overrideProperties": [{ type: core_1.Input },],
    };
    __decorate([
        store_1.select(),
        __metadata("design:type", Object)
    ], PreviewComponent.prototype, "editingState", void 0);
    return PreviewComponent;
}());
exports.PreviewComponent = PreviewComponent;
//# sourceMappingURL=preview.component.js.map