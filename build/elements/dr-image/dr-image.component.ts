import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';

@Component({
  selector: 'app-dr-image',
  template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data && visualData\">\n        <svg:g>\n            <svg:rect\n            [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n            (click)=\"onClick($event, data)\"\n            (mousedown)=\"onMouseDown($event, data)\"\n            (mousemove)=\"onMouseMove($event, data)\"\n            (mouseup)=\"onMouseUp($event, data)\"\n            [id]=\"elementId\" \n            [attr.x]=\"data.x\"\n            [attr.y]=\"data.y\"\n            [attr.width]=\"data.width\"\n            [attr.height]=\"data.height\"\n            [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n            [attr.opacity]=\"visualData.opacity\">\n          </svg:rect>\n          <svg:image \n          [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n              (click)=\"onClick($event, data)\"\n              (mousedown)=\"onMouseDown($event, data)\"\n              (mousemove)=\"onMouseMove($event, data)\"\n              (mouseup)=\"onMouseUp($event, data)\"\n              [attr.x]=\"data.x\"\n              [attr.y]=\"data.y\"\n              [attr.width]=\"data.width\"\n              [attr.height]=\"data.height\"\n              [attr.href]=\"visualData.url\"\n              [attr.opacity]=\"visualData.opacity\">\n            </svg:image>\n          <svg:rect\n          [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n            (click)=\"onClick($event, data)\"\n            (mousedown)=\"onMouseDown($event, data)\"\n            (mousemove)=\"onMouseMove($event, data)\"\n            (mouseup)=\"onMouseUp($event, data)\"\n            [id]=\"data.id\"\n            [attr.x]=\"data.x\"\n            [attr.y]=\"data.y\"\n            [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n            [attr.width]=\"data.width\"\n            [attr.height]=\"data.height\"\n            [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n            [attr.fill]=\"'transparent'\"\n            [attr.stroke-width]=\"visualData.strokeWidth\"\n            [attr.opacity]=\"visualData.opacity\">\n          </svg:rect>\n        </svg:g>\n      \n      </ng-container>\n    \n    \n    \n    </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrImageComponent extends DrObjectComponent {


  

}
