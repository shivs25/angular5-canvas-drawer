import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrText } from '../../models/dr-text';
import { DrTextAlignment } from '../../models/dr-text-alignment.enum';

@Component({
  selector: 'dr-text',
  template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data && visualData\">\n        <svg:g>\n            <svg:clipPath [id]=\"elementId\">\n                <svg:rect\n                  [attr.x]=\"data.x\"\n                  [attr.y]=\"data.y\"\n                  [attr.width]=\"data.width\"\n                  [attr.height]=\"data.height\">\n                </svg:rect>\n              </svg:clipPath>\n      \n              <svg:rect\n              [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n                (click)=\"onClick($event, data)\"\n                (mousedown)=\"onMouseDown($event, data)\"\n                (mousemove)=\"onMouseMove($event, data)\"\n                (mouseup)=\"onMouseUp($event, data)\"\n            \n                [id]=\"elementId\" \n                [attr.x]=\"data.x\"\n                [attr.y]=\"data.y\"\n                [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n                [attr.width]=\"data.width\"\n                [attr.height]=\"data.height\"\n                [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n                [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n                [attr.stroke-width]=\"visualData.strokeWidth\"\n                [attr.opacity]=\"visualData.opacity\">\n              </svg:rect>\n              <svg:g [id]=\"elementId\" [attr.clip-path]=\"'url(#' + elementId + ')'\">\n                <svg:text \n                  [id]=\"elementId\" \n                  (click)=\"onClick($event, data)\"\n                  (mousedown)=\"onMouseDown($event, data)\"\n                  (mousemove)=\"onMouseMove($event, data)\"\n                  (mouseup)=\"onMouseUp($event, data)\"\n                  [attr.x]=\"getTextX()\" \n                  [attr.y]=\"getTextY()\"\n                  [attr.fill]=\"visualData.fontColor\"\n                  [attr.font-size]=\"visualData.size + 'px'\"\n                  [attr.font-family]=\"visualData.fontFamily\"\n                  [attr.font-weight]=\"visualData.bold ? 'bold' : 'normal'\"\n                  [attr.font-style]=\"visualData.italic ? 'italic' : 'normal'\"\n                  [attr.alignment-baseline]=\"getVAlignment()\"\n                  [attr.text-anchor]=\"getHAlignment()\">\n                  {{ visualData.text }}\n              \n                </svg:text>\n              </svg:g>\n        </svg:g>\n      \n      </ng-container>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})

export class DrTextComponent extends DrObjectComponent {

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
