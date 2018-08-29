import { Component, OnInit, Input } from '@angular/core';
import { select } from '@angular-redux/store';
import { IEditingState } from '../store';

@Component({
  selector: 'app-preview',
  template: "\n\n    <div class=\"absolute-position fill-parent\">\n    \n      <svg \n            class=\"absolute-position fill-parent\" xmlns=\"http://www.w3.org/2000/svg\">\n        <ng-container *ngFor=\"let s of (editingState | async)?.previewElements; let i = index\">\n          <ng-container *ngIf=\"s.visible\" dynamic-svg [componentData]=\"s\" [overrideProperties]=\"overrideProperties\" [elementId]=\"s.id\"\n            [hoverClass]=\"hoverClass\"\n            >\n          </ng-container>\n        </ng-container>\n      </svg>\n    </div>\n  ",
  styles: ["\n\n  "]
})
export class PreviewComponent implements OnInit {

  @select()
  editingState: IEditingState;
  
  @Input()
  hoverClass: any = '';

  @Input()
  overrideProperties: any = null;

  constructor() { }

  ngOnInit() {
  }

}
