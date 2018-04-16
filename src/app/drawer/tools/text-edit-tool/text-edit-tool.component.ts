import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, ViewChild, ViewRef, ElementRef, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DrText } from '../../models/dr-text';
import { select } from '@angular-redux/store';
import { DataStoreService } from '../../services/data-store.service';
import { EditorToolType, DrTextAlignment } from '../../models/enums';
import { DynamicSvgDirective } from '../../dynamic-svg/dynamic-svg.directive';
import { EditableTextAreaComponent } from '../editable-text-area/editable-text-area.component';

import * as d3Plus from 'd3plus-text';
import { BoundingBox } from '../../models/bounding-box';
import { DrPoint } from '../../models/dr-point';
import { TEXT_PADDING, SPACE_PLACEHOLDER, TextRenderingService, LINE_HEIGHT_RATIO } from '../../services/text-rendering.service';

@Component({
  selector: 'app-text-edit-tool',
  templateUrl: './text-edit-tool.component.html',
  styleUrls: ['./text-edit-tool.component.scss']
})
export class TextEditToolComponent implements OnInit {

  @ViewChild('container') _container: ElementRef;
  @ViewChild('textArea') _textArea: EditableTextAreaComponent;

  currentObject: DrText = null;
  cssBounds: any = null;
  textAreaStyle: any = null;
  selectionTransform: string = null;
  rotation: number = 0;

  inputBorder: boolean = false;

  selectionStyle: any = {
    showFill: false,
    dashedLine: false,
    showStroke: true,
    stroke: 'red',
    strokeWidth: 1,
    rotation: 0,
    showText: false
  };  

  _offset: DrPoint = null;
  
  constructor(
    private _dataService: DataStoreService, 
    private _textRenderingService: TextRenderingService,
    private _elementRef: ElementRef) { }

  onTextAreaInput(evt): void {
    let changes: any = {};

    if (DrTextAlignment.CENTER === this.currentObject.vAlignment) {
      Object.assign(changes, this.textAreaStyle, {
        "margin-top": this.getMarginTop(evt.height)
       });
    }
    if (DrTextAlignment.CENTER === this.currentObject.hAlignment && !this.currentObject.fitText) {
      Object.assign(changes, this.textAreaStyle, {
        "margin-left": this.getMarginLeft(evt.width)
       });
    }

    if (Object.keys(changes).length > 0) {
      Object.assign(this.textAreaStyle, changes);
    }
  }

  onTextAreaLoaded(evt): void {
    let changes: any = {};

    if (DrTextAlignment.CENTER === this.currentObject.vAlignment) {
      Object.assign(changes, this.textAreaStyle, {
        "margin-top": this.getMarginTop(evt.height),
        });
    } 
    if (DrTextAlignment.CENTER === this.currentObject.hAlignment && !this.currentObject.fitText) {
      Object.assign(changes, this.textAreaStyle, {
        "margin-left": this.getMarginLeft(evt.width),
        });
    } 

    if (Object.keys(changes).length > 0) {
      Object.assign(this.textAreaStyle, changes);
    }

    Object.assign(this.textAreaStyle, {
      "opacity": 1
      });
  }

  onClick(): void {
    let newText: string = this._textRenderingService.undoHtmlText(this._textArea.newText);
    if (this.currentObject.fitText) {
      this._dataService.setText(this._dataService.selectedObjects, newText);
    }
    else {

      let bounds: BoundingBox = {
        x: this.currentObject.x,
        y: this.currentObject.y,
        width: this.currentObject.width,
        height: this.currentObject.height
      }
  
      let textAreaHeight: number = this._textArea.newHeight;
      let textAreaWidth: number = this._textArea.newWidth;

      switch(this.currentObject.vAlignment) {
        case DrTextAlignment.CENTER:
          bounds.y = bounds.y + bounds.height / 2 - textAreaHeight / 2;
          break;
        case DrTextAlignment.FAR:
          bounds.y = bounds.y + bounds.height - textAreaHeight;
          break;
      }
      bounds.height = textAreaHeight;

      switch(this.currentObject.hAlignment) {
        case DrTextAlignment.CENTER:
          bounds.x = bounds.x + bounds.width / 2 - textAreaWidth / 2;
          break;
        case DrTextAlignment.FAR:
          bounds.x = bounds.x + bounds.width - textAreaWidth;
          break;
      }
      bounds.width = textAreaWidth;

      this._dataService.setTextAndBounds(this._dataService.selectedObjects, newText, bounds);

    }
    this._dataService.selectedTool = EditorToolType.SELECTOR_TOOL;
    this._dataService.onTextObjectsChanged(this._dataService.selectedObjects);
  }


  pixelizeBounds(bounds): any {
    let returnValue: any = Object.assign({}, bounds);

    if (bounds.left) {
      returnValue.left = bounds.left + "px";
    }
    if (bounds.top) {
      returnValue.top = bounds.top + "px";
    }
    if (bounds.width) {
      returnValue.width = bounds.width + "px";
    }
    if (bounds.height) {
      returnValue.height = bounds.height + "px";
    }

    return returnValue;
  }

  divify():string {
    return this._textRenderingService.getDivText(this.currentObject);
  }
  
  ngOnInit() {
    this._offset = this._elementRef.nativeElement.getBoundingClientRect();
    this.rotation = this._dataService.selectedObjects[0].rotation;

    this.currentObject = Object.assign({}, this._dataService.selectedObjects[0]) as DrText;
    this.selectionTransform = "translate(" + (this.currentObject.x * -1) + " " + (this.currentObject.y * -1) + ")";
    this.cssBounds = {
      left: (this.currentObject.x - 1) + "px",
      top: (this.currentObject.y - 1) + "px",
      width: this.currentObject.fitText ? (this.currentObject.width + 2) + "px" : "",
      "min-width": !this.currentObject.fitText ? (this.currentObject.width + 2) + "px" : "",
      "min-height": (this.currentObject.height + 2) + "px",
      "overflow": "visible",
      transform: "rotate(" + this.rotation + "deg)"
    };

    this.textAreaStyle = {
      resize: "none",
      "background-color": "transparent",
      "-webkit-box-shadow": "none",
      "-moz-box-shadow": "none",
      "box-shadow": "none",
      "outline": "none",
      "opacity": "0",
      "color": this.currentObject.fontColor,
      "font-size": this.currentObject.size + "pt",
      "line-height": (this.currentObject.size * LINE_HEIGHT_RATIO) + "px",
      "font-family": this.currentObject.fontFamily,
      "font-weight": this.currentObject.bold ? "bold" : "normal",
      "text-align": this.getHAlign(),
      "white-space": this.currentObject.fitText ? "normal" : "nowrap",
      padding: TEXT_PADDING + "px",
      left: this.getLeft(),
      right: this.getRight(),
      top: this.getTop(),
      bottom: this.getBottom()
    };

    
    setTimeout(() => {
      let ta = this._elementRef.nativeElement.querySelector(".text-area");
      ta.focus();
      
      var selection = window.getSelection();        
      var range = document.createRange();
      range.selectNodeContents(ta);
      selection.removeAllRanges();
      selection.addRange(range);
      
    }, 1);
    
  }

  private getTop(): string {
    switch(this.currentObject.vAlignment) {
      case DrTextAlignment.NEAR:
        return -(this._textRenderingService.getAscent(this.currentObject) / 2) + "px";
      case DrTextAlignment.CENTER:
        return "50%";
      case DrTextAlignment.FAR:
        return "";
    }
  }

  private getBottom(): string {
    switch(this.currentObject.vAlignment) {
      case DrTextAlignment.NEAR:
        return "";
      case DrTextAlignment.CENTER:
        return "";
      case DrTextAlignment.FAR:
        return -(this._textRenderingService.getAscent(this.currentObject) / 2) + "px"
    }
  }

  private getLeft(): string {
    switch(this.currentObject.hAlignment) {
      case DrTextAlignment.NEAR:
        return "-1px";
      case DrTextAlignment.CENTER:
        return this.currentObject.fitText ? "-1px" : "50%";
      case DrTextAlignment.FAR:
        return this.currentObject.fitText ? "-1px" : "";
    }
  }

  private getRight(): string {
    switch(this.currentObject.hAlignment) {
      case DrTextAlignment.NEAR:
        return this.currentObject.fitText ? "-1px" : "";
      case DrTextAlignment.CENTER:
        return this.currentObject.fitText ? "-1px" : "";
      case DrTextAlignment.FAR:
        return "-1px";
    }
  }

  private getMarginTop(offsetHeight): string {
    switch(this.currentObject.vAlignment) {
      case DrTextAlignment.NEAR:
        return "0";
      case DrTextAlignment.CENTER:
        return "-" + Math.round((offsetHeight / 2)) + "px";
      case DrTextAlignment.FAR:
        return "0";
    }
  }

  private getMarginLeft(offsetWidth): string {
    
    switch(this.currentObject.hAlignment) {
      case DrTextAlignment.NEAR:
        return "0";
      case DrTextAlignment.CENTER:
        return "-" + Math.round((offsetWidth / 2)) + "px";
      case DrTextAlignment.FAR:
        return "0";
    }
  }

  private getHAlign(): string {
    switch(this.currentObject.hAlignment) {
      case DrTextAlignment.NEAR:
        return "left";
      case DrTextAlignment.CENTER:
        return "center";
      case DrTextAlignment.FAR:
        return "right";
    }
  }

  
}