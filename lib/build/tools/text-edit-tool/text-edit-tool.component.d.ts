import { OnInit } from '@angular/core';
import { DrText } from '../../models/dr-text';
import { DataStoreService } from '../../services/data-store.service';
export declare class TextEditToolComponent implements OnInit {
    private _dataService;
    currentObject: DrText;
    cssBounds: any;
    selectionTransform: string;
    selectionStyle: any;
    constructor(_dataService: DataStoreService);
    onInput(evt: any): void;
    onClick(): void;
    ngOnInit(): void;
}
