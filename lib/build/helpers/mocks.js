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
var store_1 = require("@angular-redux/store");
var change_helper_service_1 = require("../services/change-helper.service");
var drawer_object_helper_service_1 = require("../services/drawer-object-helper.service");
var MockRedux = /** @class */ (function (_super) {
    __extends(MockRedux, _super);
    function MockRedux(state) {
        var _this = _super.call(this) || this;
        _this.state = state;
        _this.dispatch = function () { return undefined; };
        _this.getState = function () { return _this.state; };
        _this.configureStore = function () { return undefined; };
        _this.configureSubStore = function () { return undefined; };
        _this.provideStore = function () { return undefined; };
        _this.replaceReducer = function () { return undefined; };
        _this.select = function () { return undefined; };
        _this.subscribe = function () { return undefined; };
        return _this;
    }
    return MockRedux;
}(store_1.NgRedux));
exports.MockRedux = MockRedux;
var MockChangeHelperService = /** @class */ (function (_super) {
    __extends(MockChangeHelperService, _super);
    function MockChangeHelperService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MockChangeHelperService;
}(change_helper_service_1.ChangeHelperService));
exports.MockChangeHelperService = MockChangeHelperService;
var MockDrawerObjectHelperService = /** @class */ (function (_super) {
    __extends(MockDrawerObjectHelperService, _super);
    function MockDrawerObjectHelperService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MockDrawerObjectHelperService;
}(drawer_object_helper_service_1.DrawerObjectHelperService));
exports.MockDrawerObjectHelperService = MockDrawerObjectHelperService;
//# sourceMappingURL=mocks.js.map