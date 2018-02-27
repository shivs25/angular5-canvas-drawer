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
var dr_rect_1 = require("./dr-rect");
var DrText = (function (_super) {
    __extends(DrText, _super);
    function DrText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DrText;
}(dr_rect_1.DrRect));
exports.DrText = DrText;
//# sourceMappingURL=dr-text.js.map