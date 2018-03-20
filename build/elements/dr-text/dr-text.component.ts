import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrText } from '../../models/dr-text';
import { DrTextAlignment } from '../../models/dr-text-alignment.enum';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';


import { DrObject } from '../../models/dr-object';
import { TextRenderingService, TEXT_PADDING } from '../../services/text-rendering.service';


@Component({
  selector: 'dr-text',
  template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data && visualData\">\n        <svg:g\n          [attr.transform]=\"visualData.rotation > 0 ? 'rotate(' + visualData.rotation + ',' + (visualData.x + visualData.width / 2 )+ ',' + (visualData.y + visualData.height / 2) + ')' : ''\">\n            >\n            <svg:clipPath [id]=\"'clip_' + elementId\">\n                <svg:rect\n                  [attr.x]=\"data.x\"\n                  [attr.y]=\"data.y\"\n                  [attr.width]=\"data.width\"\n                  [attr.height]=\"data.height\">\n                </svg:rect>\n              </svg:clipPath>\n      \n              <svg:rect\n              [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n                (click)=\"onClick($event, data)\"\n                (mousedown)=\"onMouseDown($event, data)\"\n                (mousemove)=\"onMouseMove($event, data)\"\n                (mouseup)=\"onMouseUp($event, data)\"\n            \n                [id]=\"'bounds_' + elementId\" \n            \n                [attr.x]=\"data.x\"\n                [attr.y]=\"data.y\"\n                [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n                [attr.width]=\"data.width\"\n                [attr.height]=\"data.height\"\n                [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n                [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n                [attr.stroke-width]=\"visualData.strokeWidth\"\n                [attr.opacity]=\"visualData.opacity\">\n              </svg:rect>\n              <svg:g [id]=\"'g_' + elementId\" [attr.clip-path]=\"'url(#clip_' + elementId + ')'\">\n                <ng-container *ngIf=\"lineData && lineData.length === 1\">\n                  <svg:text\n\n                    [id]=\"'text_' + elementId\" \n                    (click)=\"onClick($event, data)\"\n                    (mousedown)=\"onMouseDown($event, data)\"\n                    (mousemove)=\"onMouseMove($event, data)\"\n                    (mouseup)=\"onMouseUp($event, data)\"\n                    [attr.y]=\"getMultiLineTextY()\"\n                    [attr.fill]=\"visualData.fontColor\"\n                    [attr.font-size]=\"visualData.size + 'px'\"\n                    [attr.font-family]=\"visualData.fontFamily\"\n                    [attr.font-weight]=\"visualData.bold ? 'bold' : 'normal'\"\n                    [attr.font-style]=\"visualData.italic ? 'italic' : 'normal'\"\n                    [attr.text-anchor]=\"getHAlignment()\"\n                    [ngClass]=\"'noselect ' + (visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\">\n                \n                    <tspan class=\"preserve-white-space\" [attr.x]=\"getTextX()\">{{ lineData[0].text }}</tspan>\n                \n              \n              \n                  </svg:text>\n                </ng-container>\n                <ng-container *ngIf=\"lineData && lineData.length > 1\">\n                  <svg:text\n                    [id]=\"'text_' + elementId\" \n                    (click)=\"onClick($event, data)\"\n                    (mousedown)=\"onMouseDown($event, data)\"\n                    (mousemove)=\"onMouseMove($event, data)\"\n                    (mouseup)=\"onMouseUp($event, data)\"\n                    [attr.fill]=\"visualData.showText ? visualData.fontColor : 'transparent'\"\n                    [attr.font-size]=\"visualData.size + 'px'\"\n                    [attr.font-family]=\"visualData.fontFamily\"\n                    [attr.font-weight]=\"visualData.bold ? 'bold' : 'normal'\"\n                    [attr.font-style]=\"visualData.italic ? 'italic' : 'normal'\"\n                    [attr.text-anchor]=\"getHAlignment()\"\n                    [ngClass]=\"'noselect ' + (visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\">\n                \n                \n                    <tspan class=\"preserve-white-space\" [attr.x]=\"getTextX()\" \n                          [attr.y]=\"i === 0 ? getMultiLineTextY() : ''\" \n                          [attr.dy]=\"i !== 0 ? ((visualData.size + TEXT_PADDING) * l.lineHeightMultiplier) : ''\" \n                          *ngFor=\"let l of lineData; let i = index;\">{{ l.text}}</tspan>\n             \n              \n              \n                  </svg:text>\n                </ng-container>\n            \n              </svg:g>\n        </svg:g>\n      \n      </ng-container>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})

export class DrTextComponent extends DrObjectComponent {

  TEXT_PADDING: number = TEXT_PADDING;

  lineData: any = null;

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
      this.lineData = this._textService.getSvgText(d);
      this._data = value;
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
        return o.y + o.size + TEXT_PADDING;
      case DrTextAlignment.CENTER:
        return (o.y + o.height / 2) -     //center y of box
                (
                  (this.lineData.length - 1) * (o.size + TEXT_PADDING) / 2 - //total lines
                  ((o.size) / 2)      //Half a line because v alignment doesnt apply
                );
      case DrTextAlignment.FAR:
        return o.y + o.height - (this.lineData.length - 1) * (o.size + TEXT_PADDING) - TEXT_PADDING;

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
