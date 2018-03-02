import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';

@Component({
  selector: 'dr-ellipse',
  template: "\n    <ng-template #elementTemplate>\n        <svg:ellipse *ngIf=\"data && visualData\" \n          [ngClass]=\"visualData.clickable ? hoverClass : ''\"\n          (click)=\"onClick($event, data)\"\n          (mousedown)=\"onMouseDown($event, data)\"\n          (mousemove)=\"onMouseMove($event, data)\"\n          (mouseup)=\"onMouseUp($event, data)\"\n          [id]=\"data.id\" \n          [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n          [attr.cx]=\"visualData.x\"\n          [attr.cy]=\"visualData.y\" \n          [attr.rx]=\"visualData.rx\" \n          [attr.ry]=\"visualData.ry\"\n          [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n          [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n          [attr.stroke-width]=\"visualData.strokeWidth\"\n          [attr.opacity]=\"visualData.opacity\">\n        </svg:ellipse>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrEllipseComponent extends DrObjectComponent {

  ngOnInit() {
  }

}
