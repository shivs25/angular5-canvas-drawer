import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';

@Component({
  selector: 'dr-ellipse',
  template: "\n    <ng-template #elementTemplate>\n        <svg:ellipse *ngIf=\"data && visualData\" \n          [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n          (click)=\"onClick($event, data)\"\n          (mousedown)=\"onMouseDown($event, data)\"\n          (mousemove)=\"onMouseMove($event, data)\"\n          (mouseup)=\"onMouseUp($event, data)\"\n          [id]=\"elementId\"\n          [attr.transform]=\"visualData.rotation > 0 ? 'rotate(' + visualData.rotation + ',' + (visualData.x)+ ',' + (visualData.y) + ')' : ''\"\n          [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n          [attr.cx]=\"data.x\"\n          [attr.cy]=\"data.y\" \n          [attr.rx]=\"data.rx\" \n          [attr.ry]=\"data.ry\"\n          [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n          [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n          [attr.stroke-width]=\"visualData.strokeWidth\"\n          [attr.opacity]=\"visualData.opacity\">\n        </svg:ellipse>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrEllipseComponent extends DrObjectComponent {



}
