"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var i0 = require("@angular/core");
var CustomComponentResolverService = /** @class */ (function () {
    function CustomComponentResolverService() {
    }
    CustomComponentResolverService.prototype.buildComponent = function (data) {
        return null;
    };
    CustomComponentResolverService.prototype.canRotate = function (data) {
        return false;
    };
    CustomComponentResolverService.decorators = [
        { type: core_1.Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    CustomComponentResolverService.ctorParameters = function () { return []; };
    CustomComponentResolverService.ngInjectableDef = i0.defineInjectable({ factory: function CustomComponentResolverService_Factory() { return new CustomComponentResolverService(); }, token: CustomComponentResolverService, providedIn: "root" });
    return CustomComponentResolverService;
}());
exports.CustomComponentResolverService = CustomComponentResolverService;
//# sourceMappingURL=custom-component-resolver.service.js.map