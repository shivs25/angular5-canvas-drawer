import { OnInit } from '@angular/core';
import { IEditingState } from '../store';
export declare class PreviewComponent implements OnInit {
    editingState: IEditingState;
    hoverClass: any;
    overrideProperties: any;
    constructor();
    ngOnInit(): void;
}
