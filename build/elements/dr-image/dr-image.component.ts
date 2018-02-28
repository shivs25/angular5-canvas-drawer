import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';

@Component({
  selector: 'app-dr-image',
  template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data\">\n          <svg:rect\n          [ngClass]=\"{ clickable: data.clickable }\"\n          (click)=\"onClick(data)\"\n          [id]=\"data.id\"\n          [attr.x]=\"data.x\"\n          [attr.y]=\"data.y\"\n          [attr.width]=\"data.width\"\n          [attr.height]=\"data.height\"\n          [attr.fill]=\"data.fill\"\n          [attr.opacity]=\"data.opacity\">\n        </svg:rect>\n        <svg:image \n            [ngClass]=\"{ clickable: data.clickable }\"\n            (click)=\"onClick(data)\"\n            [attr.x]=\"data.x\"\n            [attr.y]=\"data.y\"\n            [attr.width]=\"data.width\"\n            [attr.height]=\"data.height\"\n            [attr.href]=\"data.url\"\n            [attr.opacity]=\"data.opacity\">\n          </svg:image>\n        <svg:rect\n          [ngClass]=\"{ clickable: data.clickable }\"\n          (click)=\"onClick(data)\"\n          [id]=\"data.id\"\n          [attr.x]=\"data.x\"\n          [attr.y]=\"data.y\"\n          [attr.width]=\"data.width\"\n          [attr.height]=\"data.height\"\n          [attr.fill]=\"data.showFill ? data.fill : 'transparent'\"\n          [attr.stroke]=\"data.showStroke ? data.stroke : 'transparent'\"\n          [attr.stroke-width]=\"data.strokeWidth\"\n          [attr.opacity]=\"data.opacity\">\n        </svg:rect>\n      </ng-container>\n    \n    \n    \n    </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrImageComponent extends DrObjectComponent {


  ngOnInit() {
  }

}
