import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrText } from '../../models/dr-text';
import { DrTextAlignment } from '../../models/dr-text-alignment.enum';

@Component({
  selector: 'dr-text',
  template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data && visualData\">\n          <svg:clipPath [id]=\"data.id + 'clip'\">\n              <svg:rect\n                [attr.x]=\"visualData.x\"\n                [attr.y]=\"visualData.y\"\n                [attr.width]=\"visualData.width\"\n                [attr.height]=\"visualData.height\">\n              </svg:rect>\n            </svg:clipPath>\n    \n            <svg:rect\n              [ngClass]=\"visualData.clickable ? hoverClass : ''\"\n              (click)=\"onClick($event, data)\"\n              (mousedown)=\"onMouseDown($event, data)\"\n              (mousemove)=\"onMouseMove($event, data)\"\n              (mouseup)=\"onMouseUp($event, data)\"\n          \n              [id]=\"data.id\"\n              [attr.x]=\"visualData.x\"\n              [attr.y]=\"visualData.y\"\n              [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n              [attr.width]=\"visualData.width\"\n              [attr.height]=\"visualData.height\"\n              [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n              [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n              [attr.stroke-width]=\"visualData.strokeWidth\"\n              [attr.opacity]=\"visualData.opacity\">\n            </svg:rect>\n            <svg:g [attr.clip-path]=\"'url(#' + data.id + 'clip)'\">\n              <svg:text \n                (click)=\"onClick($event, data)\"\n                (mousedown)=\"onMouseDown($event, data)\"\n                (mousemove)=\"onMouseMove($event, data)\"\n                (mouseup)=\"onMouseUp($event, data)\"\n\n                [attr.x]=\"getTextX()\" \n                [attr.y]=\"getTextY()\"\n                [attr.fill]=\"visualData.fontColor\"\n                [attr.font-size]=\"visualData.size + 'px'\"\n                [attr.font-family]=\"visualData.fontFamily\"\n                [attr.font-weight]=\"visualData.bold ? 'bold' : 'normal'\"\n                [attr.font-style]=\"visualData.italic ? 'italic' : 'normal'\"\n                [attr.alignment-baseline]=\"getVAlignment()\"\n                [attr.text-anchor]=\"getHAlignment()\">\n                {{ visualData.text }}\n            \n              </svg:text>\n            </svg:g>\n      </ng-container>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})

export class DrTextComponent extends DrObjectComponent {

  ngOnInit() {
  }

  getTextX(): number {
    let o: DrText = this.visualData as DrText;

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
    let o: DrText = this.visualData as DrText;

    switch(o.vAlignment){
      case DrTextAlignment.NEAR:
        return o.y;
      case DrTextAlignment.CENTER:
        return o.y + o.height / 2;
      case DrTextAlignment.FAR:
        return o.y + o.height;

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
