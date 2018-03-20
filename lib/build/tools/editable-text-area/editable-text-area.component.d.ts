import { OnInit, EventEmitter, ElementRef } from '@angular/core';
export declare class EditableTextAreaComponent implements OnInit {
    _textArea: ElementRef;
    private _text;
    border: boolean;
    textAreaStyle: any;
    text: string;
    load: EventEmitter<any>;
    dataInput: EventEmitter<any>;
    readonly newText: string;
    readonly newHeight: number;
    readonly newWidth: number;
    constructor();
    ngOnInit(): void;
    onInput(evt: any): void;
}
