import { Component, OnInit, Input } from '@angular/core';
import { DrRect } from '../../models/dr-rect';
import { DrObjectComponent } from '../dr-object/dr-object.component';

@Component({
  selector: 'dr-rect',
  template: "\n    <ng-template #elementTemplate>\n        <svg:rect *ngIf=\"data && visualData\" \n        [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n          (click)=\"onClick($event, data)\"\n          (mousedown)=\"onMouseDown($event, data)\"\n          (mousemove)=\"onMouseMove($event, data)\"\n          (mouseup)=\"onMouseUp($event, data)\"\n          [id]=\"elementId\" \n          [attr.x]=\"data.x\" \n          [attr.y]=\"data.y\" \n          [attr.transform]=\"visualData.rotation > 0 ? 'rotate(' + visualData.rotation + ',' + (visualData.x + visualData.width / 2 )+ ',' + (visualData.y + visualData.height / 2) + ')' : ''\"\n          [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n          [attr.width]=\"data.width\" \n          [attr.height]=\"data.height\"\n          [attr.rx]=\"data.rounded ? 16 : 0\"\n          [attr.ry]=\"data.rounded ? 16 : 0\"\n          [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n          [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n          [attr.stroke-width]=\"visualData.strokeWidth\"\n          [attr.opacity]=\"visualData.opacity\">\n        </svg:rect>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrRectComponent extends DrObjectComponent {


 
}
