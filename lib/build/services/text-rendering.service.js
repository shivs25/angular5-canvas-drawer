"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var d3Plus = require("d3plus-text");
exports.SPACE_PLACEHOLDER = "~";
exports.TEXT_PADDING = 4;
var TextRenderingService = (function () {
    function TextRenderingService() {
    }
    TextRenderingService.prototype.undoHtmlText = function (html) {
        return html
            .replace(/<div><br><\/div>/g, "\n")
            .replace(/<br>/g, "\n")
            .replace(/<div>/g, "\n")
            .replace(/<\/div>/g, "")
            .replace(/&nbsp;/g, " ");
    };
    TextRenderingService.prototype.getDivText = function (d) {
        var c = d3Plus.textWrap()
            .fontFamily(d.fontFamily)
            .fontSize(d.size)
            .fontWeight(d.bold ? 'bold' : 'normal')
            .width(d.width - 2 * exports.TEXT_PADDING);
        var userLineBreaks = d.text.split("\n");
        var returnValue = "";
        var exp = new RegExp(exports.SPACE_PLACEHOLDER + " ", "g");
        for (var _i = 0, userLineBreaks_1 = userLineBreaks; _i < userLineBreaks_1.length; _i++) {
            var u = userLineBreaks_1[_i];
            if (0 !== u.length) {
                var lineData = c(this.replaceSpaces(u));
                for (var _a = 0, _b = lineData.lines; _a < _b.length; _a++) {
                    var l = _b[_a];
                    if (0 === returnValue.length) {
                        returnValue = l.replace(exp, "&nbsp;");
                    }
                    else {
                        returnValue += "<div>" + l.replace(exp, "&nbsp;") + "</div>";
                    }
                }
            }
            else {
                returnValue += "<div><br></div>";
            }
        }
        return returnValue;
    };
    TextRenderingService.prototype.getSvgText = function (d) {
        var returnValue = [];
        var c = d3Plus.textWrap()
            .fontFamily(d.fontFamily)
            .fontSize(d.size)
            .fontWeight(d.bold ? 'bold' : 'normal')
            .width(d.width - 2 * exports.TEXT_PADDING);
        var userLineBreaks = d.text.split("\n");
        var multiplier = 1;
        var exp = new RegExp(exports.SPACE_PLACEHOLDER + " ", "g");
        for (var _i = 0, userLineBreaks_2 = userLineBreaks; _i < userLineBreaks_2.length; _i++) {
            var u = userLineBreaks_2[_i];
            if (0 !== u.length) {
                for (var _a = 0, _b = c(this.replaceSpaces(u)).lines; _a < _b.length; _a++) {
                    var l = _b[_a];
                    returnValue.push({
                        text: l.replace(exp, " "),
                        lineHeightMultiplier: multiplier
                    });
                }
                multiplier = 1;
            }
            else {
                returnValue.push({
                    text: "",
                    lineHeightMultiplier: 0
                });
                multiplier++;
            }
        }
        return returnValue;
    };
    TextRenderingService.prototype.replaceSpaces = function (s) {
        var normalSplit = s.split(" ");
        var newSentence = "";
        for (var i = 0; i < normalSplit.length; i++) {
            if (i === normalSplit.length - 1) {
                newSentence += normalSplit[i].length > 0 ? (normalSplit[i]) : "";
            }
            else {
                newSentence += normalSplit[i].length > 0 ? (normalSplit[i] + " ") : exports.SPACE_PLACEHOLDER + " ";
            }
        }
        return newSentence;
    };
    TextRenderingService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    TextRenderingService.ctorParameters = function () { return []; };
    return TextRenderingService;
}());
exports.TextRenderingService = TextRenderingService;
//# sourceMappingURL=text-rendering.service.js.map