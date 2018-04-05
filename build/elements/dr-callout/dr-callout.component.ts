import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrCallout } from '../../models/dr-callout';

@Component({
  selector: 'app-dr-callout',
  template: "\n    <ng-template #elementTemplate>\n      <!--<svg:ellipse *ngIf=\"data && visualData\" \n        [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n        (click)=\"onClick($event, data)\"\n        (mousedown)=\"onMouseDown($event, data)\"\n        (mousemove)=\"onMouseMove($event, data)\"\n        (mouseup)=\"onMouseUp($event, data)\"\n        [id]=\"elementId\"\n        [attr.transform]=\"visualData.rotation > 0 ? 'rotate(' + visualData.rotation + ',' + (visualData.x)+ ',' + (visualData.y) + ')' : ''\"\n        [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n        [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n        [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n        [attr.stroke-width]=\"visualData.strokeWidth\"\n        [attr.opacity]=\"visualData.opacity\"\n    \n    \n        >\n      </svg:ellipse>-->\n\n      <ng-container *ngIf=\"data && visualData\">\n        <svg:g [id]=\"elementId\">\n          <defs>\n            <clipPath id=\"'union_' + elementId\">\n              <svg:rect \n                [attr.x]=\"data.x\" \n                [attr.y]=\"data.y\"\n                [attr.width]=\"data.width\" \n                [attr.height]=\"data.height\">\n              </svg:rect>\n              <svg:polygon\n                [attr.points]=\"getPoints()\">\n              </svg:polygon>\n            </clipPath>\n          </defs>\n          <svg:rect\n            [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n            (click)=\"onClick($event, data)\"\n            (mousedown)=\"onMouseDown($event, data)\"\n            (mousemove)=\"onMouseMove($event, data)\"\n            (mouseup)=\"onMouseUp($event, data)\"\n            [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n            [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n            [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n            [attr.stroke-width]=\"visualData.strokeWidth\"\n            [attr.opacity]=\"visualData.opacity\"\n            [attr.clip-path]=\"'url(#union_' + elementId + ')'\"\n            [attr.x]=\"getBoundsX()\"\n            [attr.y]=\"getBoundsY()\"\n            [attr.width]=\"getBoundsWidth()\"\n            [attr.height]=\"getBoundsHeight()\"\n            >\n        \n          </svg:rect>\n        </svg:g>\n      </ng-container>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrCalloutComponent extends DrObjectComponent {

  getPoints(): string {
    let returnValue: string = "";
    let r: DrCallout = this.data as DrCallout;
    let p: DrCallout;

    returnValue += r.basePoint1.x + " " + r.basePoint1.y + " ";
    returnValue += r.basePoint2.x + " " + r.basePoint2.y + " ";
    returnValue += (r.x + r.pointerLocation.x) + " " + (r.y + r.pointerLocation.y) + " ";

    return returnValue.trim();
  }

  getBoundsX(): number {
    let r: DrCallout = this.data as DrCallout;
    return  Math.min(r.x, r.pointerLocation.x);
  }

  getBoundsY(): number {
    let r: DrCallout = this.data as DrCallout;
    return  Math.min(r.y, r.pointerLocation.y);
  }

  getBoundsWidth(): number {
    let r: DrCallout = this.data as DrCallout;
    let left: number = Math.min(r.x, r.pointerLocation.x);
    let right: number = Math.max(r.x + r.width, r.pointerLocation.x);
    return right - left;
  }

  getBoundsHeight(): number {
    let r: DrCallout = this.data as DrCallout;
    let top: number = Math.min(r.y, r.pointerLocation.y);
    let bottom: number = Math.max(r.y + r.height, r.pointerLocation.y);
    return bottom - top;
  }
}
