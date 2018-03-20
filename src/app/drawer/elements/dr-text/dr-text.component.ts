import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrText } from '../../models/dr-text';
import { DrTextAlignment } from '../../models/dr-text-alignment.enum';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';

import * as d3Plus from 'd3plus-text';
import { DrObject } from '../../models/dr-object';

export const TEXT_PADDING: number = 4;

export const SPACE_PLACEHOLDER: string = "~";

export function replaceSpaces(s: string): string {
  let normalSplit: string[] = s.split(" ");
  let newSentence: string = "";
  for(let n of normalSplit) {
    newSentence += n.length > 0 ? (n + " ") : SPACE_PLACEHOLDER + " ";
  }
  return newSentence.trim();
}

@Component({
  selector: 'dr-text',
  templateUrl: './dr-text.component.html',
  styleUrls: ['./dr-text.component.scss']
})

export class DrTextComponent extends DrObjectComponent {

  TEXT_PADDING: number = TEXT_PADDING;

  lineData: any = null;

  private _data: DrObject = null;

  get visualData(): DrObject {
    return this._data;
  }

  set visualData(value: DrObject) {
    if (this._data !== value) {
      let d: DrText = value as DrText;

      let c: any = d3Plus.textWrap()
      .fontFamily(d.fontFamily)
      .fontSize(d.size)
      .fontWeight(d.bold ? 'bold' : 'normal')
      .width(d.width - 2 * TEXT_PADDING);

      let userLineBreaks: string[] = d.text.split("\n");

      let ld: any[] = [];
      let multiplier: number = 0;
      for(let u of userLineBreaks) {
        if (0 !== u.length) {
          for(let l of c(this.redoSpaces(u)).lines) {
            ld.push({
              text: l,
              multiplier: multiplier
            })
          }
          multiplier = 1;
        }
        else {
          ld.push({
            text: "",
            multiplier: 0
          });

          multiplier++;
        }
      }
      this.lineData = ld;
      
      this._data = value;
    }
  }

  redoSpaces(l: string): string {
    let exp: RegExp = new RegExp(SPACE_PLACEHOLDER + " ", "g");
    return l.replace(exp, " ");
  }

  getTextX(): number {
    let o: DrText = this.data as DrText;

    switch(o.hAlignment){
      case DrTextAlignment.NEAR:
        return o.x + TEXT_PADDING;
      case DrTextAlignment.CENTER:
        return o.x + o.width / 2;
      case DrTextAlignment.FAR:
        return o.x + o.width - TEXT_PADDING;

    }
  }

  getTextY(): number {
    let o: DrText = this.data as DrText;

    switch(o.vAlignment){
      case DrTextAlignment.NEAR:
        return o.y + TEXT_PADDING;
      case DrTextAlignment.CENTER:
        return o.y + o.height / 2;
      case DrTextAlignment.FAR:
        return o.y + o.height - TEXT_PADDING;

    }
  }

  getMultiLineTextY(): number {
    let o: DrText = this.visualData as DrText;

    switch(o.vAlignment){
      case DrTextAlignment.NEAR:
        return o.y + o.size + TEXT_PADDING;
      case DrTextAlignment.CENTER:
        return (o.y + o.height / 2) -     //center y of box
                (
                  (this.lineData.lines.length - 1) * (o.size + TEXT_PADDING) / 2 - //total lines
                  ((o.size) / 2)      //Half a line because v alignment doesnt apply
                );
      case DrTextAlignment.FAR:
        return o.y + o.height - (this.lineData.lines.length - 1) * (o.size + TEXT_PADDING) - TEXT_PADDING;

    }
  }

  getVAlignment(): string {
    let o: DrText = this.visualData as DrText;

    switch(o.vAlignment){
      case DrTextAlignment.NEAR:
        return 'hanging';
      case DrTextAlignment.CENTER:
        return 'middle';
      case DrTextAlignment.FAR:
        return  'alphabetical';

    }
  }

  getHAlignment(): string {
    let o: DrText = this.visualData as DrText;

    switch(o.hAlignment){
      case DrTextAlignment.NEAR:
        return 'start';
      case DrTextAlignment.CENTER:
        return 'middle';
      case DrTextAlignment.FAR:
        return  'end';

    }
  }
}
