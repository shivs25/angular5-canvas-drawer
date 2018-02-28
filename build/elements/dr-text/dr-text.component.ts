import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrText } from '../../models/dr-text';
import { DrTextAlignment } from '../../models/dr-text-alignment.enum';

@Component({
  selector: 'dr-text',
  template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data\">\n          <svg:clipPath [id]=\"data.id + 'clip'\">\n              <svg:rect\n                [attr.x]=\"data.x\"\n                [attr.y]=\"data.y\"\n                [attr.width]=\"data.width\"\n                [attr.height]=\"data.height\">\n              </svg:rect>\n            </svg:clipPath>\n    \n            <svg:rect\n              [ngClass]=\"{ clickable: data.clickable }\"\n              (click)=\"onClick(data)\"\n              [id]=\"data.id\"\n              [attr.x]=\"data.x\"\n              [attr.y]=\"data.y\"\n              [attr.width]=\"data.width\"\n              [attr.height]=\"data.height\"\n              [attr.fill]=\"data.showFill ? data.fill : 'transparent'\"\n              [attr.stroke]=\"data.showStroke ? data.stroke : 'transparent'\"\n              [attr.stroke-width]=\"data.strokeWidth\"\n              [attr.opacity]=\"data.opacity\">\n            </svg:rect>\n            <svg:g [attr.clip-path]=\"'url(#' + data.id + 'clip)'\">\n              <svg:text \n                [attr.x]=\"getTextX()\" \n                [attr.y]=\"getTextY()\"\n                [attr.fill]=\"data.fontColor\"\n                [attr.font-size]=\"data.size + 'px'\"\n                [attr.font-family]=\"data.fontFamily\"\n                [attr.font-weight]=\"data.bold ? 'bold' : 'normal'\"\n                [attr.font-style]=\"data.italic ? 'italic' : 'normal'\"\n                [attr.alignment-baseline]=\"getVAlignment()\"\n                [attr.text-anchor]=\"getHAlignment()\">\n                {{ data.text }}\n            \n              </svg:text>\n            </svg:g>\n      </ng-container>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})

export class DrTextComponent extends DrObjectComponent {

  ngOnInit() {
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
        return o.x + o.height;

    }
  }

  getVAlignment(): string {
    let o: DrText = this.data as DrText;

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
    let o: DrText = this.data as DrText;

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
