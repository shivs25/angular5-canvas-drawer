import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, ViewChild, ViewRef, ElementRef, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DrText } from '../../models/dr-text';
import { select } from '@angular-redux/store';
import { DataStoreService } from '../../services/data-store.service';
import { EditorToolType, DrTextAlignment } from '../../models/enums';
import { DynamicSvgDirective } from '../../dynamic-svg/dynamic-svg.directive';
import { TEXT_PADDING, replaceSpaces, SPACE_PLACEHOLDER } from '../../elements/dr-text/dr-text.component';
import { EditableTextAreaComponent } from '../editable-text-area/editable-text-area.component';

import * as d3Plus from 'd3plus-text';
import { BoundingBox } from '../../models/bounding-box';
import { DrPoint } from '../../models/dr-point';

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
    private _elementRef: ElementRef) { }

  onTextAreaInput(evt): void {
    if (DrTextAlignment.CENTER === this.currentObject.vAlignment) {
      Object.assign(this.textAreaStyle, {
        "margin-top": this.getMarginTop(evt.height)
       });
    }
    
    let newVal: boolean = evt.height >= this._container.nativeElement.offsetHeight;

    if (newVal !== this.inputBorder) {
      this.inputBorder = newVal;
    }
   
  }

  onTextAreaLoaded(evt): void {
    if (DrTextAlignment.CENTER === this.currentObject.vAlignment) {
      Object.assign(this.textAreaStyle, {
        "margin-top": this.getMarginTop(evt),
        });
    } 

    Object.assign(this.textAreaStyle, {
      "opacity": 1
      });
  }

  onClick(): void {

    let newText: string = this._textArea.newText
    .replace(/<div><br><\/div>/g, "\n")
    .replace(/<br>/g, "\n")
    .replace(/<div>/g, "\n")
    .replace(/<\/div>/g, "")
    .replace(/&nbsp;/g, " ");

    let bounds: BoundingBox = {
      x: this.currentObject.x,
      y: this.currentObject.y,
      width: this.currentObject.width,
      height: this.currentObject.height
    }

    let textAreaSize: number = this._textArea.newHeight;

    if (textAreaSize > this.currentObject.height) {
      switch(this.currentObject.vAlignment) {
        case DrTextAlignment.CENTER:
          bounds.y -= textAreaSize / 2;
          break;
        case DrTextAlignment.FAR:
          bounds.y -= textAreaSize;
          break;
      }

      bounds.height = textAreaSize;
    }

    console.log(newText);
    this._dataService.setTextAndBounds(this._dataService.selectedObjects, newText, bounds);


    this._dataService.selectedTool = EditorToolType.SELECTOR_TOOL;
  }

  ngOnInit() {
    this._offset = this._elementRef.nativeElement.getBoundingClientRect();
    this.rotation = this._dataService.selectedObjects[0].rotation;

    this.currentObject = Object.assign({}, this._dataService.selectedObjects[0]) as DrText;
    this.selectionTransform = "translate(" + (this.currentObject.x * -1) + " " + (this.currentObject.y * -1) + ")";
    this.cssBounds = {
      left: (this.currentObject.x - 1) + "px",
      top: (this.currentObject.y - 1) + "px",
      width: (this.currentObject.width + 2) + "px",
      "min-height": (this.currentObject.height + 2) + "px",
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
      "font-size": this.currentObject.size + "px",
      "line-height": (this.currentObject.size + TEXT_PADDING) + "px",
      "font-family": this.currentObject.fontFamily,
      "text-align": this.getHAlign(),
      padding: TEXT_PADDING + "px",
      left: "-1px",
      right: "-1px",
      top: this.getTop(),
      bottom: this.getBottom()
    };
  }

  private getTop(): string {
    switch(this.currentObject.vAlignment) {
      case DrTextAlignment.NEAR:
        return "-1px";
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
        return "-1px";
    }
  }

  private getMarginTop(offsetHeight): string {
    switch(this.currentObject.vAlignment) {
      case DrTextAlignment.NEAR:
        return "0";
      case DrTextAlignment.CENTER:
        return "-" + (offsetHeight / 2) + "px";
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

  private divify():string {
    let d: DrText = this.currentObject;

    let lineData: any = d3Plus.textWrap()
      .fontFamily(d.fontFamily)
      .fontSize(d.size)
      .fontWeight(d.bold ? 'bold' : 'normal')
      .width(d.width - 2 * TEXT_PADDING)
      (replaceSpaces(d.text));

    let returnValue: string = lineData.lines[0];
    let exp: RegExp = new RegExp(SPACE_PLACEHOLDER + " ", "g");
    for(let i: number = 1; i < lineData.lines.length; i++) {
      returnValue += "<div>" + lineData.lines[i].replace(exp, "&nbsp;") + "</div>";
    }
    return returnValue;
  }
}
