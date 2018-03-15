import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DrText } from '../../models/dr-text';
import { select } from '@angular-redux/store';
import { DataStoreService } from '../../services/data-store.service';
import { EditorToolType } from '../../models/enums';

@Component({
  selector: 'app-text-edit-tool',
  template: "\n    <div class=\"absolute-position fill-parent\" contenteditable=\"true\" (input)=\"onInput($event)\" (click)=\"onClick()\">\n    \n      <svg *ngIf=\"cssBounds\" [ngStyle]=\"cssBounds\"\n            [ngClass]=\"'text'\"\n            class=\"absolute-position\" xmlns=\"http://www.w3.org/2000/svg\" >\n      \n          <svg:g [attr.transform]=\"selectionTransform\">\n            <ng-container \n              dynamic-svg \n              [elementId]=\"100000\"\n              [componentData]=\"currentObject\"\n              [overrideProperties]=\"selectionStyle\"\n              [hoverClass]=\"'text'\" \n\n            ></ng-container>\n          </svg:g>\n      \n\n      </svg>\n    </div>\n  ",
  styles: ["\n\n  "]
})
export class TextEditToolComponent implements OnInit {
  currentObject: DrText = null;
  cssBounds: any = null;
  selectionTransform: string = null;

  selectionStyle: any = {
    showFill: false,
    dashedLine: false,
    showStroke: true,
    stroke: 'red',
    strokeWidth: 1

  };  

  constructor(private _dataService: DataStoreService) { }

  onInput(evt): void {
    console.log(evt);
  }

  onClick(): void {
    this._dataService.selectedTool = EditorToolType.SELECTOR_TOOL;
  }

  ngOnInit() {
    this.currentObject = Object.assign({}, this._dataService.selectedObjects[0]) as DrText;
    this.selectionTransform = "translate(" + (this.currentObject.x * -1) + " " + (this.currentObject.y * -1) + ")";
    this.cssBounds = {
      left: this.currentObject.x,
      top: this.currentObject.y,
      width: this.currentObject.width,
      height: this.currentObject.height
    }
  }
}
