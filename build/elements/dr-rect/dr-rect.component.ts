import { Component, OnInit, Input } from '@angular/core';
import { DrRect } from '../../models/dr-rect';
import { DrObjectComponent } from '../dr-object/dr-object.component';

@Component({
  selector: 'dr-rect',
  template: "\n    <ng-template #elementTemplate>\n        <svg:rect *ngIf=\"data && visualData\" \n          [ngClass]=\"visualData.clickable ? hoverClass : ''\"\n          (click)=\"onClick($event, data)\"\n          (mousedown)=\"onMouseDown($event, data)\"\n          (mousemove)=\"onMouseMove($event, data)\"\n          (mouseup)=\"onMouseUp($event, data)\"\n          [id]=\"data.id\" \n          [attr.x]=\"visualData.x\" \n          [attr.y]=\"visualData.y\" \n          [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n          [attr.width]=\"visualData.width\" \n          [attr.height]=\"visualData.height\"\n          [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n          [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n          [attr.stroke-width]=\"visualData.strokeWidth\"\n          [attr.opacity]=\"visualData.opacity\">\n        </svg:rect>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrRectComponent extends DrObjectComponent {


  ngOnInit() {
  }

}
