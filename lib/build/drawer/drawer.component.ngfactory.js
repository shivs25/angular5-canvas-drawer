"use strict";
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = require("@angular/core");
var i1 = require("../dynamic-svg/dynamic-svg.directive");
var i2 = require("@angular/common");
var i3 = require("./drawer.component");
var styles_DrawerComponent = [""];
var RenderType_DrawerComponent = i0.ɵcrt({ encapsulation: 0, styles: styles_DrawerComponent, data: {} });
exports.RenderType_DrawerComponent = RenderType_DrawerComponent;
function View_DrawerComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵeld(2, 16777216, null, null, 1, null, null, null, null, function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onClick($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(3, 81920, null, 0, i1.DynamicSvgDirective, [i0.ViewContainerRef, i0.ComponentFactoryResolver], { componentData: [0, "componentData"] }, { click: "click" }), (_l()(), i0.ɵted(-1, null, ["\n      "]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 3, 0, currVal_0); }, null); }
function View_DrawerComponent_0(_l) { return i0.ɵvid(0, [i0.ɵqud(402653184, 1, { container: 0 }), (_l()(), i0.ɵted(-1, null, ["\n\n    "])), (_l()(), i0.ɵeld(2, 0, [[1, 0], ["container", 1]], null, 4, ":svg:svg", [["height", "400"], ["viewBox", "0 0 400 400"], ["width", "400"], ["xmlns", "http://www.w3.org/2000/svg"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_DrawerComponent_1)), i0.ɵdid(5, 802816, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.elements; _ck(_v, 5, 0, currVal_0); }, null); }
exports.View_DrawerComponent_0 = View_DrawerComponent_0;
function View_DrawerComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "app-drawer", [], null, null, null, View_DrawerComponent_0, RenderType_DrawerComponent)), i0.ɵdid(1, 114688, null, 0, i3.DrawerComponent, [i0.ComponentFactoryResolver], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_DrawerComponent_Host_0 = View_DrawerComponent_Host_0;
var DrawerComponentNgFactory = i0.ɵccf("app-drawer", i3.DrawerComponent, View_DrawerComponent_Host_0, { elements: "elements" }, {}, []);
exports.DrawerComponentNgFactory = DrawerComponentNgFactory;
//# sourceMappingURL=drawer.component.ngfactory.js.map