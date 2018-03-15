import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrObject } from '../../models/dr-object';
import { MouseEventData } from '../../models/mouse-event-data';

@Component({
  selector: 'app-dr-grouped-object',
  template: "\n    <ng-template #elementTemplate>\n        <ng-container *ngIf=\"data && visualData\">\n          <svg:g\n          [attr.transform]=\"data.visualData > 0 ? 'rotate(' + data.visualData + ',' + getRotationCenterX() + ',' + getRotationCenterY() + ')' : ''\"\n          >\n            <ng-container *ngFor=\"let s of data.objects; let i = index\">\n                <ng-container *ngIf=\"s.visible\" dynamic-svg [componentData]=\"s\" [overrideProperties]=\"overrideProperties\" [elementId]=\"i + 1\"\n                  [hoverClass]=\"hoverClass\"\n                  (mouseDown)=\"onChildMouseDown($event)\"\n                  (mouseMove)=\"onChildMouseMove($event)\"\n                  (mouseUp)=\"onChildMouseUp($event)\"\n                  >\n                </ng-container>\n              </ng-container>\n          </svg:g>\n        </ng-container>\n      </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrGroupedObjectComponent extends DrObjectComponent {


  onChildMouseDown(data:MouseEventData): void {
    this.mouseDown.emit(Object.assign(data, { data: this.data }));

  }

  onChildMouseMove(data:MouseEventData): void {
    this.mouseMove.emit(Object.assign(data, { data: this.data }));
  }

  onChildMouseUp(data:MouseEventData): void {
    this.mouseUp.emit(Object.assign(data, { data: this.data }));
  }
}
