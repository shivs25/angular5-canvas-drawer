import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrText } from '../../models/dr-text';
import { DrTextAlignment } from '../../models/dr-text-alignment.enum';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';


import { DrObject } from '../../models/dr-object';
import { TextRenderingService, TEXT_PADDING, LINE_HEIGHT_RATIO } from '../../services/text-rendering.service';
import { TextInfo } from '../../models/text-info';


@Component({
  selector: 'dr-text',
  templateUrl: './dr-text.component.html',
  styleUrls: ['./dr-text.component.scss']
})

export class DrTextComponent extends DrObjectComponent {

  TEXT_PADDING: number = TEXT_PADDING;
  LINE_HEIGHT_RATIO: number = LINE_HEIGHT_RATIO;
  MATH: any = Math;

  lineData: any = null;
  firstLine: number = 0;

  private _data: DrObject = null;


  constructor(private _textService: TextRenderingService,
              _objectHelperService: DrawerObjectHelperService) {

    super(_objectHelperService);
  }

  get visualData(): DrObject {
    return this._data;
  }

  set visualData(value: DrObject) {
    if (this._data !== value) {
      let d: DrText = value as DrText;
      let ti: TextInfo[] = this._textService.getSvgText(d);
      this.firstLine = ti.findIndex((t) => t.text.length > 0);
      this.lineData = ti;
      this._data = value; 
      console.log(this.visualData);
    }
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
        return o.y + this._textService.getLineHeight(o) - this._textService.getAscent(o) + TEXT_PADDING;
      case DrTextAlignment.CENTER:
        return (o.y + o.height / 2) -     //center y of box
                (
                  (this.lineData.length * this._textService.getLineHeight(o)) / 2
                ) + this._textService.getLineHeight(o) - this._textService.getAscent(o) / 2;
      case DrTextAlignment.FAR:
        return o.y + o.height - TEXT_PADDING;

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
