"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var d3Plus = require("d3plus-text");
exports.SPACE_PLACEHOLDER = "~";
exports.TEXT_PADDING = 4;
exports.LINE_HEIGHT_RATIO = 1.618;
var TextRenderingService = /** @class */ (function () {
    function TextRenderingService() {
    }
    TextRenderingService.prototype.undoHtmlText = function (html) {
        var returnValue = html
            .replace(/<div><span/g, "<span")
            .replace(/<\/span><br>/g, "")
            .replace(/<div><br><\/div>/g, "\n")
            .replace(/<br>/g, "\n")
            .replace(/<div>/g, "\n")
            .replace(/<\/div>/g, "")
            .replace(/<\/span>/g, "")
            .replace(/&nbsp;/g, " ");
        var idx = returnValue.indexOf("<span");
        var endIdx;
        while (idx >= 0) {
            endIdx = returnValue.indexOf(">", idx);
            returnValue = returnValue.substring(0, idx) + returnValue.substring(endIdx + 1);
            idx = returnValue.indexOf("<span");
        }
        return returnValue;
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
        var u;
        var w;
        var prevHasDiv = false;
        for (var x = 0; x < userLineBreaks.length; x++) {
            u = userLineBreaks[x];
            if (0 !== u.length) {
                var lineData = c(this.replaceSpaces(u));
                var l = void 0;
                for (var i = 0; i < lineData.lines.length; i++) {
                    l = lineData.lines[i];
                    if (0 === returnValue.length) {
                        returnValue = l.replace(exp, "&nbsp;");
                    }
                    else {
                        if (prevHasDiv && x === userLineBreaks.length - 1 && i === lineData.lines.length - 1) {
                            returnValue += l.replace(exp, "&nbsp;");
                        }
                        else {
                            returnValue += "<div>" + l.replace(exp, "&nbsp;") + "</div>";
                        }
                    }
                    prevHasDiv = l.indexOf("<div>") >= 0;
                }
            }
            else {
                returnValue += "<div><br></div>";
                prevHasDiv = true;
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
        /*w = d3Plus.textWidth(l,
                {
                  "font-size": d.size + "pt",
                  "font-family": d.fontFamily,
                  "font-weight": d.bold ? "bold" : "normal"
                });*/
        var userLineBreaks = d.text.split("\n");
        var multiplier = 1;
        var exp = new RegExp(exports.SPACE_PLACEHOLDER + " ", "g");
        var lineData;
        for (var _i = 0, userLineBreaks_1 = userLineBreaks; _i < userLineBreaks_1.length; _i++) {
            var u = userLineBreaks_1[_i];
            if (0 !== u.length) {
                lineData = c(this.replaceSpaces(u));
                for (var _a = 0, _b = lineData.lines; _a < _b.length; _a++) {
                    var l = _b[_a];
                    returnValue.push({
                        text: l.replace(exp, " "),
                        lineHeightMultiplier: multiplier
                    });
                }
                multiplier = 1;
            }
            else {
                if (0 === returnValue.length) {
                    returnValue.push({
                        text: "",
                        lineHeightMultiplier: 1
                    });
                }
                else {
                    returnValue.push({
                        text: "",
                        lineHeightMultiplier: 0
                    });
                    multiplier++;
                }
            }
        }
        return returnValue;
    };
    TextRenderingService.prototype.getLineHeight = function (o) {
        return Math.round(o.size * exports.LINE_HEIGHT_RATIO);
    };
    TextRenderingService.prototype.getAscent = function (o) {
        return (this.getLineHeight(o) - o.size);
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