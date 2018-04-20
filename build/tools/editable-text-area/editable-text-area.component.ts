import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { BoundingBox } from '../../models/bounding-box';

@Component({
  selector: 'app-editable-text-area',
  template: "\n    <div #textArea (input)=\"onInput($event)\" \n                  [ngClass]=\"{ \n                    'absolute-position': true, \n                    'border-red': border, \n                    'border-invisible': !border,\n                    'text-area': true\n                  }\" contenteditable [ngStyle]=\"textAreaStyle\" [innerHTML]=\"text\"></div>\n  \n  ",
  styles: ["\n\n  "]
})
export class EditableTextAreaComponent implements OnInit {

  @ViewChild('textArea') _textArea: ElementRef;

  private _text: string = null;

  @Input() 
  border: boolean = false;

  @Input()
  textAreaStyle: any = null;

  @Input()
  text: string = null;

  @Output()
  load: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  dataInput: EventEmitter<any> = new EventEmitter<any>();

  get newText(): string {
    return  this._textArea.nativeElement.innerHTML;
  }

  get newHeight(): number {
    return this._textArea.nativeElement.offsetHeight;
  }

  get newWidth(): number {
    return this._textArea.nativeElement.offsetWidth;
  }

  constructor() {
  
   }

  ngOnInit(): void {
    
    //Hack to get the update of dom outside of the change detection loop.
    setTimeout(() => {
      this.load.emit({
        width: this._textArea.nativeElement.offsetWidth,
        height: this._textArea.nativeElement.offsetHeight, 
      });
    }, 1);
    
  }

  onInput(evt): void {
    //Hack to get the update of dom outside of the change detection loop.
   
    setTimeout(() => {
      this.dataInput.emit({
        event: evt,
        height: this._textArea.nativeElement.offsetHeight,
        width: this._textArea.nativeElement.offsetWidth
      });
    }, 1);

    
  }

  finalize(): void {
    //Not Implemented
  }
}
