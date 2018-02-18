import { Component, OnInit, Input } from '@angular/core';
import { DrRect } from '../../models/dr-rect';
import { DrObjectComponent } from '../dr-object/dr-object.component';

@Component({
  selector: 'dr-rect',
  template: "\n    <ng-template #elementTemplate>\n        <svg:rect *ngIf=\"data\" \n          [ngClass]=\"{ clickable: data.clickable }\"\n          (click)=\"onClick(data)\"\n          [id]=\"data.id\" \n          [attr.x]=\"data.x\" \n          [attr.y]=\"data.y\" \n          [attr.width]=\"data.width\" \n          [attr.height]=\"data.height\"\n          [attr.fill]=\"data.fill\"\n          [attr.stroke]=\"data.stroke\"\n          [attr.stroke-width]=\"data.strokeWidth\"\n          [attr.opacity]=\"data.opacity\">\n        </svg:rect>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrRectComponent extends DrObjectComponent {

  
  ngOnInit() {
    
  }

}
