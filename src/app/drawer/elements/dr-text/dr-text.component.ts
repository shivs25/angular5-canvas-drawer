import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrText } from '../../models/dr-text';
import { DrTextAlignment } from '../../models/dr-text-alignment.enum';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';

import * as d3Plus from 'd3plus-text';
import { DrObject } from '../../models/dr-object';


@Component({
  selector: 'dr-text',
  templateUrl: './dr-text.component.html',
  styleUrls: ['./dr-text.component.scss']
})

export class DrTextComponent extends DrObjectComponent {

  lineData: any = null;

  private _data: DrObject = null;

  get visualData(): DrObject {
    return this._data;
  }

  set visualData(value: DrObject) {
    if (this._data !== value) {
      let d: DrText = value as DrText;
      this.lineData = d3Plus.textWrap()
      .fontFamily(d.fontFamily)
      .fontSize(d.size)
      .fontWeight(d.bold ? 'bold' : 'normal')
      .width(d.width)
      ((value as DrText).text);

      this._data = value;
    }
  }

  getTextX(): number {
    let o: DrText = this.data as DrText;

    switch(o.hAlignment){
      case DrTextAlignment.NEAR:
        return o.x;
      case DrTextAlignment.CENTER:
        return o.x + o.width / 2;
      case DrTextAlignment.FAR:
        return o.x + o.width;

    }
  }

  getTextY(): number {
    let o: DrText = this.data as DrText;

    switch(o.vAlignment){
      case DrTextAlignment.NEAR:
        return o.y;
      case DrTextAlignment.CENTER:
        return o.y + o.height / 2;
      case DrTextAlignment.FAR:
        return o.y + o.height;

    }
  }

  getMultiLineTextY(): number {
    let o: DrText = this.visualData as DrText;

    switch(o.vAlignment){
      case DrTextAlignment.NEAR:
        return o.y + o.size + 2;
      case DrTextAlignment.CENTER:
        return (o.y + o.height / 2) -     //center y of box
                (
                  (this.lineData.lines.length - 1) * (o.size + 2) / 2 - //total lines
                  ((o.size + 2) / 2)      //Half a line because v alignment doesnt apply
                );
      case DrTextAlignment.FAR:
        return o.y + o.height - (this.lineData.lines.length - 1) * (o.size + 2) - 2;

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
