import { Injectable } from '@angular/core';
import { TextInfo } from '../models/text-info';

import * as d3Plus from 'd3plus-text';
import { DrText } from '../models/dr-text';

export const SPACE_PLACEHOLDER: string = "~";
export const TEXT_PADDING: number = 4;






@Injectable()
export class TextRenderingService {

  constructor() { }

  undoHtmlText(html: string): string {

    return html
    .replace(/<div><br><\/div>/g, "\n")
    .replace(/<br>/g, "\n")
    .replace(/<div>/g, "\n")
    .replace(/<\/div>/g, "")
    .replace(/&nbsp;/g, " ");
  }

  getDivText(d: DrText): string {
    let c: any = d3Plus.textWrap()
      .fontFamily(d.fontFamily)
      .fontSize(d.size)
      .fontWeight(d.bold ? 'bold' : 'normal')
      .width(d.width - 2 * TEXT_PADDING);

      let userLineBreaks: string[] = d.text.split("\n");

      let returnValue: string = "";

      let exp: RegExp = new RegExp(SPACE_PLACEHOLDER + " ", "g");
      for(let u of userLineBreaks) {
        if (0 !== u.length) {
          let lineData = c(this.replaceSpaces(u));
          for(let l of lineData.lines) {
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
  }

  getSvgText(d: DrText): TextInfo[] {
    let returnValue: TextInfo[] = [];
    let c: any = d3Plus.textWrap()
      .fontFamily(d.fontFamily)
      .fontSize(d.size)
      .fontWeight(d.bold ? 'bold' : 'normal')
      .width(d.width - 2 * TEXT_PADDING);

      let userLineBreaks: string[] = d.text.split("\n");

      let multiplier: number = 1;
      let exp: RegExp = new RegExp(SPACE_PLACEHOLDER + " ", "g");
      for(let u of userLineBreaks) {
        if (0 !== u.length) {
          for(let l of c(this.replaceSpaces(u)).lines) {
            returnValue.push({
              text: l.replace(exp, " "),
              lineHeightMultiplier: multiplier
            })
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
  }

  private replaceSpaces(s: string): string {
    let normalSplit: string[] = s.split(" ");
    let newSentence: string = "";

    for(let i: number = 0; i < normalSplit.length; i++) {
      if (i === normalSplit.length - 1) {
        newSentence += normalSplit[i].length > 0 ? (normalSplit[i]) : "";
      }
      else {
        newSentence += normalSplit[i].length > 0 ? (normalSplit[i] + " ") : SPACE_PLACEHOLDER + " ";
      }
    }
    return newSentence;
  }
}
