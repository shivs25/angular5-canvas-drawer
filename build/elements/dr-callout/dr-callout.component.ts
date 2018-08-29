import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrCallout } from '../../models/dr-callout';
import { Observable } from 'rxjs';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
import { DrPoint } from '../../models/dr-point';


@Component({
  selector: 'app-dr-callout',
  template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data && visualData\">\n        <svg:path\n          [id]=\"elementId\"\n          [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n          (click)=\"onClick($event, data)\"\n          (mousedown)=\"onMouseDown($event, data)\"\n          (mousemove)=\"onMouseMove($event, data)\"\n          (mouseup)=\"onMouseUp($event, data)\"\n          [attr.opacity]=\"visualData.opacity\"\n          [attr.d]=\"getPath()\"\n          [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n          [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n          [attr.stroke-width]=\"visualData.strokeWidth\"\n          [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n          >      \n        </svg:path>\n      </ng-container>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrCalloutComponent extends DrObjectComponent {

  getPath(): string {
    let r: DrCallout = this.data as DrCallout;
    let v: DrCallout = this.visualData as DrCallout;
    return this._objectHelperService.getCalloutPath(Object.assign({}, r, {
      drawPointer: v.drawPointer
    }));
  }
    
}
