import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';

@Component({
  selector: 'dr-ellipse',
  template: "\n    <ng-template #elementTemplate>\n        <svg:ellipse *ngIf=\"data\" \n          [ngClass]=\"{ clickable: data.clickable }\"\n          (click)=\"onClick(data)\"\n          [id]=\"data.id\" \n          [attr.cx]=\"data.x\" \n          [attr.cy]=\"data.y\" \n          [attr.rx]=\"data.rx\" \n          [attr.ry]=\"data.ry\"\n          [attr.fill]=\"data.showFill ? data.fill : 'transparent'\"\n          [attr.stroke]=\"data.showStroke ? data.stroke : 'transparent'\"\n          [attr.stroke-width]=\"data.strokeWidth\"\n          [attr.opacity]=\"data.opacity\">\n        </svg:ellipse>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrEllipseComponent extends DrObjectComponent {

  ngOnInit() {
  }

}
