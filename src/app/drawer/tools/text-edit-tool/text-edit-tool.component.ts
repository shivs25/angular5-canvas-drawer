import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DrText } from '../../models/dr-text';
import { select } from '@angular-redux/store';
import { DataStoreService } from '../../services/data-store.service';
import { EditorToolType } from '../../models/enums';

@Component({
  selector: 'app-text-edit-tool',
  templateUrl: './text-edit-tool.component.html',
  styleUrls: ['./text-edit-tool.component.scss']
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
